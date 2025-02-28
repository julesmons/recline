import type { Provider } from "ai";
import * as vscode from "vscode";
import { Agent } from "./agents/agent";
import { createModelProviderRegistry } from "./lm";
import { createContentBuilder } from "./utils/contentBuilder.util";
import { ReclineViewProvider } from "./webview/recline.viewProvider";
import { ReclineView } from "./webview/recline.view";

let configurationWatcher: vscode.Disposable | null = null;
export let modelRegistry: Provider | null = null;
let initializingModelRegistry: boolean = false;

async function initModelRegistry(): Promise<void> {
    if (initializingModelRegistry) {
        // TODO: Abort & restart initialization (as there should be a reason for this to happen (e.g. configuration change))
        return;
    }

    initializingModelRegistry = true;
    modelRegistry = await createModelProviderRegistry();
    initializingModelRegistry = false;

    console.log("Recline: Model registry initialized");
}

export function activate(context: vscode.ExtensionContext): void {
    console.log("Recline: Initializing...");

    // Watch for configuration changes to re-initialize the model registry
    configurationWatcher = vscode.workspace.onDidChangeConfiguration(
        (event) => {
            if (
                event.affectsConfiguration("recline") ||
                event.affectsConfiguration("lm")
            ) {
                initModelRegistry();
            }
        }
    );

    // Watch for chat model changes to re-initialize the model registry
    vscode.lm.onDidChangeChatModels(() => {
        initModelRegistry();
    });

    // Register the Recline view provider
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(
            ReclineViewProvider.viewId,
            new ReclineViewProvider(context.extensionUri)
        )
    );

    context.subscriptions.push(
        // A command to test the system... This should be removed ASAP.
        vscode.commands.registerCommand("recline.testDrive", async () => {
            if (modelRegistry == null) {
                console.warn("Recline: Model registry not initialized.");
                return;
            }

            const cwd: string =
                vscode.workspace.workspaceFolders?.[0].uri.fsPath ??
                "(UNKNOWN WORKING DIRECTORY)";

            const agent = new Agent(
                modelRegistry.languageModel(
                    "vscode-lm:copilot:claude-3.7-sonnet"
                ),
                cwd,
                undefined,
                [
                    {
                        role: "user",
                        content:
                            "Please create 'hello_world.txt' in the root of my workspace. Insert your best knock-knock joke into the file."
                    }
                ]
            );

            const builder = createContentBuilder();
            let debugCounter = 0;

            for await (const chunk of agent.run()) {
                builder.append(chunk);

                if (debugCounter++ > 10) {
                    console.log(builder.toString());
                    builder.clear();
                    debugCounter = 0;
                }
            }
        })
    );

    // initModelRegistry().then((): void => {
    //     console.log("Recline: Initialized successfully");
    // });
}
