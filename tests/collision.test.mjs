import test from 'node:test';import assert from 'node:assert/strict';
import {touchesPlayer,itemZ,laneX,PLAYER_RADIUS,MINE_RADIUS} from '../gameplay-space.js';
const progress=z=>(z+36)*.87/36;
function mine(lane,z){return {type:'obstacle',lane,z:progress(z)}}
test('Render coordinates put player and contact line at world zero',()=>{assert.equal(itemZ(.87),0);assert.equal(laneX(1),0);assert.equal(laneX(2),2.66)});
test('Adjacent lanes never lose a life to an untouched mine',()=>{assert.equal(touchesPlayer(mine(0,0),progress(-.2),1,1),false);assert.equal(touchesPlayer(mine(2,0),progress(-.2),1,1),false)});
test('A mine directly touching the player registers contact',()=>assert.equal(touchesPlayer(mine(1,0),progress(-.4),1,1),true));
test('Fast mines cannot tunnel through the player between frames',()=>assert.equal(touchesPlayer(mine(1,3),progress(-3),1,1),true));
test('Dodge uses the visible interpolated position, not the old lane',()=>{assert.equal(touchesPlayer(mine(1,0),progress(-3),1,2),false);assert.equal(touchesPlayer(mine(1,0),progress(-3),2,1),true)});
test('Decorative glow does not count as a collision',()=>{const edge=(PLAYER_RADIUS+MINE_RADIUS+.05)/2.66;assert.equal(touchesPlayer(mine(1,0),progress(-.1),1+edge,1+edge),false)});
test('An already passed mine cannot hit from a different depth',()=>assert.equal(touchesPlayer(mine(1,4),progress(3),1,1),false));
