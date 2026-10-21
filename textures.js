import * as THREE from 'three';
// Small, locally generated seamless textures: no network requests or image licensing.
export function workshopTextures(){
 let seed=912;const random=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296};
 function make(kind){const canvas=document.createElement('canvas');canvas.width=canvas.height=256;const c=canvas.getContext('2d');c.fillStyle='#ddd4be';c.fillRect(0,0,256,256);
 if(kind==='sky'){const g=c.createLinearGradient(0,0,0,256);g.addColorStop(0,'#102d50');g.addColorStop(1,'#4597a1');c.fillStyle=g;c.fillRect(0,0,256,256);for(let i=0;i<80;i++){c.fillStyle='#fff5ce';c.fillRect(random()*256,random()*200,1.5,1.5)}c.fillStyle='#fff0be';c.beginPath();c.arc(188,48,22,0,7);c.fill();for(let i=0;i<3;i++){c.fillStyle=['#55868b','#90b4ae','#dbded0'][i];c.beginPath();c.moveTo(0,256);for(let x=0;x<=256;x+=8)c.lineTo(x,195+i*16+Math.sin(x*.025+i)*16);c.lineTo(256,256);c.fill()}}
 if(kind==='wood'){for(let i=0;i<140;i++){c.strokeStyle=`rgba(64,35,12,${.04+random()*.12})`;c.lineWidth=1+random()*3;c.beginPath();let y=random()*256;c.moveTo(0,y);c.bezierCurveTo(65,y+random()*12,180,y-random()*12,256,y);c.stroke()}for(let y=0;y<256;y+=64){c.fillStyle='#806b5240';c.fillRect(0,y,256,2)}for(let y=32;y<256;y+=64){c.strokeStyle='#78634760';c.beginPath();c.ellipse(85,y,25,4,0,0,7);c.stroke()}}
 if(kind==='gift'){for(let y=16;y<256;y+=32)for(let x=16;x<256;x+=32){c.fillStyle='#fff8e9';c.beginPath();for(let i=0;i<10;i++){let a=i*Math.PI/5,r=i%2?2.5:6;c.lineTo(x+Math.cos(a)*r,y+Math.sin(a)*r)}c.fill();c.fillStyle='#9d8860';c.fillRect(x+15,y+13,2,2)}}
 if(kind==='fabric'){for(let i=0;i<256;i+=4){c.fillStyle=i%8?'#f6edda60':'#605b5040';c.fillRect(i,0,1,256);c.fillRect(0,i,256,1)}}
 if(kind==='metal'){c.fillStyle='#c3c4ba';c.fillRect(0,0,256,256);for(let i=0;i<256;i++){c.fillStyle=`rgba(255,255,255,${random()*.18})`;c.fillRect(0,i,256,1)}for(let x of [10,246])for(let y of [10,246]){c.fillStyle='#6c726b';c.beginPath();c.arc(x,y,3,0,7);c.fill()}}
 if(kind==='brick'){c.fillStyle='#d4c6aa';c.fillRect(0,0,256,256);for(let row=0;row<8;row++)for(let col=-1;col<5;col++){c.fillStyle=`rgb(${170+Math.floor(random()*35)},${150+Math.floor(random()*22)},${129+Math.floor(random()*20)})`;c.fillRect(col*64+(row%2)*32+2,row*32+2,60,28)}}
 if(kind==='snow'){c.fillStyle='#eef2e6';c.fillRect(0,0,256,256);for(let i=0;i<1700;i++){c.fillStyle=random()>.5?'#acbdc526':'#ffffff90';c.fillRect(random()*256,random()*256,1+random()*3,1)}}
 const t=new THREE.CanvasTexture(canvas);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=4;return t}
 return Object.fromEntries(['wood','gift','fabric','metal','brick','snow','sky'].map(k=>[k,make(k)]));
}
