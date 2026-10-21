import test from 'node:test';import assert from 'node:assert/strict';import {HeadSteering} from '../tracking.js';
const face=(x,width=.3)=>({boundingBox:{xCenter:1-x,width}});
function calibrate(s){for(let i=0;i<24;i++)s.update(face(.5),i*40)}
test('Requires stable calibration and ignores small jitter',()=>{let s=new HeadSteering();calibrate(s);assert.equal(s.center,.5);for(let i=24;i<60;i++)assert.equal(s.update(face(.5+(i%2?.01:-.01)),i*40).lane,1)});
test('Steers left and right with hysteresis, then resets for replay',()=>{let s=new HeadSteering();calibrate(s);for(let i=24;i<40;i++)s.update(face(.34),i*40);assert.equal(s.lane,0);for(let i=40;i<60;i++)s.update(face(.66),i*40);assert.equal(s.lane,2);s.reset();assert.equal(s.center,null);assert.equal(s.lane,1)});
test('Distance normalization and face loss',()=>{for(const width of [.2,.4]){let s=new HeadSteering();calibrate(s);for(let i=24;i<50;i++)s.update(face(.5+width*.5,width),i*40);assert.equal(s.lane,2);assert.equal(s.update(null,4000).lost,true)}});
test('Moving during calibration restarts sampling',()=>{let s=new HeadSteering();for(let i=0;i<24;i++)s.update(face(i%2?.4:.6),i*40);assert.equal(s.center,null);assert.equal(s.samples.length,0)});
