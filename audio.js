export class WorkshopAudio {
 constructor(){this.context=null;this.muted=false;this.playing=false;this.musicVolume=.5;this.effectsVolume=.85;this.step=0;this.next=0;this.timer=null}
 async unlock(){if(!this.context){const C=window.AudioContext||window.webkitAudioContext;if(!C)return;this.context=new C();this.master=this.context.createGain();this.master.gain.value=.72;this.compressor=this.context.createDynamicsCompressor();this.compressor.threshold.value=-14;this.compressor.ratio.value=5;this.music=this.context.createGain();this.effects=this.context.createGain();this.music.connect(this.master);this.effects.connect(this.master);this.master.connect(this.compressor);this.compressor.connect(this.context.destination);this.setVolumes(this.musicVolume,this.effectsVolume)}try{await this.context.resume()}catch{} }
 setVolumes(music,effects){this.musicVolume=music;this.effectsVolume=effects;if(this.context){this.music.gain.setTargetAtTime(music,this.context.currentTime,.04);this.effects.gain.setTargetAtTime(effects,this.context.currentTime,.04)}}
 setMuted(muted){this.muted=muted;if(this.context)this.master.gain.setTargetAtTime(muted?0:.72,this.context.currentTime,.04)}
 note(freq,time,duration,gain=.2,bus=this.music,type='sine'){if(!this.context)return;const o=this.context.createOscillator(),v=this.context.createGain();o.type=type;o.frequency.value=freq;o.connect(v);v.connect(bus);v.gain.setValueAtTime(0,time);v.gain.linearRampToValueAtTime(gain,time+.012);v.gain.exponentialRampToValueAtTime(.0001,time+duration);o.start(time);o.stop(time+duration+.03);o.onended=()=>{o.disconnect();v.disconnect()}}
 bell(midi,time,gain=.23){let f=440*2**((midi-69)/12);this.note(f,time,.55,gain);this.note(f*2.76,time,.25,gain*.22);this.note(f*4,time,.1,gain*.08)}
 start(){this.playing=true;void this.unlock().then(()=>{if(!this.context||!this.playing||this.timer)return;this.next=this.context.currentTime+.04;this.timer=setInterval(()=>this.schedule(),80);this.schedule()})}
 schedule(){if(!this.playing||this.context.state!=='running')return;const now=this.context.currentTime;if(this.next<now-.2)this.next=now+.04;
 // Original 8-bar music-box waltz in C major, with bells and a warm bass pulse.
 const tune=[76,79,84,79,76,72,74,77,81,77,74,71,72,76,79,84,79,76,74,71,67,71,74,79,76,79,84,88,86,84,81,77,74,77,81,84,79,76,72,76,74,71,72,76,79,76,72,0];
 while(this.next<now+.25){let n=this.step%tune.length;if(tune[n])this.bell(tune[n],this.next,.21);if(n%3===0){let bass=[48,53,48,55,48,53,55,48][Math.floor(n/6)];this.note(440*2**((bass-69)/12),this.next,.6,.22,this.music,'triangle');this.bell(bass+24,this.next,.07)}this.next+=.235;this.step++}}
 pause(){this.playing=false;clearInterval(this.timer);this.timer=null}
 effect(kind){void this.unlock().then(()=>{if(!this.context||this.muted)return;let t=this.context.currentTime+.01;if(kind==='hit'){this.note(170,t,.28,.55,this.effects,'triangle');this.note(95,t+.08,.28,.35,this.effects,'sine')}else{const notes=kind==='star'?[84,88,91,96]:kind==='finish'?[72,76,79,84]:[79,84];notes.forEach((n,i)=>this.note(440*2**((n-69)/12),t+i*.075,.32,.38,this.effects,'sine'))}})}
 dispose(){this.pause();void this.context?.close()}
}
