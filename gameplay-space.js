// Shared world coordinates for rendering and collision. Glows are decorative, never hitboxes.
export const LANE_SPACING=2.66;
export const PLAYER_RADIUS=.67;
export const MINE_RADIUS=.60;
export const GIFT_RADIUS=.65;
export const laneX=lane=>(lane-1)*LANE_SPACING;
export const itemZ=progress=>-36+(progress/.87)*36;
// Relative swept circles prevent tunneling and use the same interpolated player position as rendering.
export function touchesPlayer(item,previousProgress,previousPlayerLane,playerLane){
 const x0=laneX(item.lane)-laneX(previousPlayerLane),x1=laneX(item.lane)-laneX(playerLane);
 const z0=itemZ(previousProgress),z1=itemZ(item.z),dx=x1-x0,dz=z1-z0;
 const distance=dx*dx+dz*dz;
 const t=distance?Math.max(0,Math.min(1,-(x0*dx+z0*dz)/distance)):0;
 const radius=PLAYER_RADIUS+(item.type==='obstacle'?MINE_RADIUS:GIFT_RADIUS);
 return (x0+dx*t)**2+(z0+dz*t)**2<radius*radius;
}
