> [!IMPORTANT]  
> This proof-of-concept has been shelved for the time being.
> I'm currently using [Augment Code](https://www.augmentcode.com/) and am exceptionally happy with it.
> It's basically what I wanted Recline to become once it was fully done. I just might pick this project back up at a later time, but for now it's on hold.

# Recline
The AI assistant that seamlessly integrates with VSCode to autonomously create, edit, and run terminal commands; redefining how you code.

> [!IMPORTANT]  
> Recline is being be rewritten from scratch.  
> It is currently in the "proof-of-concept" stage.  
> Recline will be fully usable and work as expected once it reaches version 1.0.0  
> # If you're looking for the [Cline](https://cline.bot) fork, it's archived [here](https://github.com/julesmons/recline-legacy)  

## Installing

Eventually Recline will be released on the VSCode Marketplace.  
However; This project is currently in a very experimental state.  

To install and test-drive Recline, you'll need to manually build the extension and install directly from VSIX.  

### 1. Clone the repository:
  ```bash
  git clone https://github.com/julesmons/recline.git
  ```
  ```bash
  cd ./recline
  ```
### 2. Install dependencies
  ```bash
  pnpm install
  ```
### 3. Package as VSIX 
  ```bash
  pnpm run package
  ```
### 4. Install the extension into VSCode
  > [!NOTE]  
  > Version number will differ based on the actual version in `./package.json`
  ```bash
  code --install-extension ./recline-0.0.1.vsix
  ```
### 5. Recline! 🎉

## License

[Mozilla Public License Version 2.0 © 2025 Jules Mons](./LICENSE)  

## Attribution

[Recliner Icon](https://thenounproject.com/creator/iconpai19/)  
