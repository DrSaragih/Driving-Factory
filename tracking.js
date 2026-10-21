// Face-width normalization keeps steering sensitivity consistent with camera distance.
export class HeadSteering {
 constructor(){this.reset()}
 reset(){this.samples=[];this.center=null;this.filtered=null;this.lane=1;this.candidate=1;this.since=0;this.lastSeen=0}
 update(detection,now){if(!detection)return {lane:this.lane,ready:false,lost:now-this.lastSeen>700};
 const box=detection.boundingBox,x=1-box.xCenter,width=box.width;
 if(!Number.isFinite(x)||!Number.isFinite(width)||width<.07)return {lane:this.lane,ready:false,lost:true};
 this.lastSeen=now;
 if(this.center===null){this.samples.push(x);if(this.samples.length<24)return {lane:1,ready:false,progress:this.samples.length/24};const sorted=[...this.samples].sort((a,b)=>a-b);if(sorted.at(-1)-sorted[0]>.045){this.samples=[];return {lane:1,ready:false,progress:0}}this.center=sorted[Math.floor(sorted.length/2)];this.filtered=x}
 this.filtered+=(x-this.filtered)*.38;
 const delta=(this.filtered-this.center)/Math.max(.12,width),enter=.34,leave=.18;
 let next=this.lane;if(this.lane===1)next=delta< -enter?0:delta>enter?2:1;else if(this.lane===0)next=delta>enter?2:delta> -leave?1:0;else next=delta< -enter?0:delta<leave?1:2;
 if(next!==this.candidate){this.candidate=next;this.since=now}if(now-this.since>=95)this.lane=next;
 return {lane:this.lane,ready:true,delta};
 }
}
