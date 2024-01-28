<script lang="ts">
import * as PIXI from 'pixi.js';
import { onMount } from 'svelte';

import InputHandler from './game/InputHandler';
import duck_sprite from './game/assets/duck.png';

let canvas: HTMLElement;

let ducks: PIXI.Sprite[] = [];

onMount(async () => {
    PIXI.BaseTexture.defaultOptions.scaleMode = PIXI.SCALE_MODES.NEAREST;

    const app = new PIXI.Application<HTMLCanvasElement>({
        background: '#1099bb',
        width: 640,
        height: 360,
        resolution: 1,
    });
    
    canvas.appendChild(app.view);
    
    const duck = PIXI.Sprite.from(duck_sprite);
    duck.anchor.x = duck.width / 2, duck.anchor.y = duck.height / 2;
    app.stage.addChild(duck);
    
    const speed = 1;
    
    duck.x = app.screen.width / 2;
    
    const input = new InputHandler(canvas);

    app.ticker.add((delta) => {
        if (document.activeElement !== canvas) input.active_keys = [];
        const direction = {x: 0, y: 0};

        if (input.keyDown('w') || input.keyDown('ArrowUp')) direction.y -= 1;
        if (input.keyDown('s') || input.keyDown('ArrowDown')) direction.y += 1;
        if (input.keyDown('a') || input.keyDown('ArrowLeft')) direction.x -= 1, duck.scale.x = 1;
        if (input.keyDown('d') || input.keyDown('ArrowRight')) direction.x += 1, duck.scale.x = -1;
        
        if (Math.abs(direction.x) + Math.abs(direction.y) === 2) direction.x *= 1/Math.SQRT2, direction.y *= 1/Math.SQRT2;

        duck.x += direction.x * speed * delta;
        duck.y += direction.y * speed * delta;
        
        duck.x = duck.x;

        if (duck.x >= app.screen.width) duck.x = app.screen.width;
        if (duck.y >= app.screen.height) duck.y = app.screen.height;
        if (duck.x <= 0) duck.x = 0;
        if (duck.y <= 0) duck.y = 0;
        

        if (ducks.length < 10) {
            let nuova_papera = PIXI.Sprite.from(duck_sprite);
            ducks = [...ducks, nuova_papera];
            nuova_papera.x = Math.random() * 500;
            nuova_papera.y = Math.random() * 500;
            app.stage.addChild(nuova_papera);
        }

        ducks.forEach((current_duck) => {
            current_duck.x += (Math.random() - 0.5) * speed * delta;
            current_duck.y += (Math.random() - 0.5) * speed * delta;

            if (current_duck.x >= app.screen.width) current_duck.x = app.screen.width;
            if (current_duck.y >= app.screen.height) current_duck.y = app.screen.height;
            if (current_duck.x <= 0) current_duck.x = 0;
            if (current_duck.y <= 0) current_duck.y = 0;
        });
    });
})
</script> 

<button
    on:click={() => canvas.focus()} 
    id="game" bind:this={canvas} class="w-[640px] h-[360px] outline-none object-contain hidden md:block group relative"
>
    <div class="w-full h-full bg-opacity-60 bg-dark absolute top-0 left-0 group-focus:hidden grid place-items-center">
        <h1 class="text-white font-bold text-xl">Click to Focus</h1>
    </div>
</button>
