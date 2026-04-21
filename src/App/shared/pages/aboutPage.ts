class AboutPage{
    container: HTMLElement | null = document.getElementById('app');
    constructor(){
        this.container!.innerHTML = "<h1> About Page </h1>";
        this.container!.style.cssText = "height: 100vh; width: 100vw; display: flex; justify-content: center; align-items: center; background: linear-gradient(135deg, #1a1a1a, #ff6600, #ff9900); color: white; font-family: Arial, sans-serif;";
    }

    mount(parent: HTMLElement){
        parent.appendChild(this.container!);
    }
}

export { AboutPage }

