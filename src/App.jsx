import { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { Selection, Select, EffectComposer, Outline } from '@react-three/postprocessing'
import './index.css'

function Model(props) {
  const { nodes, materials } = useGLTF('/Barn_Testing.glb')
  return (
    <group {...props} dispose={null}>
      <group scale={1}>
        <mesh geometry={nodes.Mesh.geometry} material={materials.Siding_LPSmartPanelSiding} />
        <mesh geometry={nodes.Mesh_1.geometry} material={materials.Siding_BoardandBatten} />
        <mesh geometry={nodes.Mesh_2.geometry} material={materials.Roofing_Shingles_DesertTan} />
        <mesh geometry={nodes.Mesh_3.geometry} material={materials.Wood_Trim_Interior} />
        <mesh geometry={nodes.Mesh_4.geometry} material={materials.Wood_InteriorFloor} />
        <mesh geometry={nodes.Mesh_5.geometry} material={materials.Wood_Trim} />
        <mesh geometry={nodes.Mesh_6.geometry} material={materials.Metal_Interior} />
        <mesh geometry={nodes.Mesh_7.geometry} material={materials.Metal_Exterior} />
      </group>
      <group scale={1}>
        <mesh geometry={nodes.Mesh001.geometry} material={materials.Wood_Trim_Interior} />
        <mesh geometry={nodes.Mesh001_1.geometry} material={materials.Wood_Interior} />
        <mesh geometry={nodes.Mesh001_2.geometry} material={materials.Wood_Trim} />
        <Selection>
          <EffectComposer multisampling={8} autoClear={false}>
            <Outline blur visibleEdgeColor="white" edgeStrength={100} width={500} />
          </EffectComposer>
          <Select enabled={props.wall === "wall0"}>
            <mesh geometry={nodes.LoftedBarn_6Wall_10x12_None_Wall1.geometry} material={materials.Siding_LPSmartPanelSiding} />
          </Select>
          <Select enabled={props.wall === "wall1"}>
            <mesh geometry={nodes.LoftedBarn_6Wall_10x12_None_Wall2.geometry} material={materials.Siding_LPSmartPanelSiding} />
          </Select>
          <Select enabled={props.wall === "wall2"}>
            <mesh geometry={nodes.LoftedBarn_6Wall_10x12_None_Wall3.geometry} material={materials.Siding_LPSmartPanelSiding} />
          </Select>
          <Select enabled={props.wall === "wall3"}>
            <mesh geometry={nodes.LoftedBarn_6Wall_10x12_None_Wall4.geometry} material={materials.Siding_LPSmartPanelSiding} />
          </Select>
        </Selection>
      </group>
    </group>
  )
}

function App() {
  const [wall, setWall] = useState("wall0");
  return (
    <div className='wrapper'>
      <select
        value={wall}
        onChange={e => setWall(e.target.value)}
      >
          <option value="wall0">Wall 0</option>
          <option value="wall1">Wall 1</option>
          <option value="wall2">Wall 2</option>
          <option value="wall3">Wall 3</option>
      </select>
      <Canvas camera={{ fov: 70, position: [0,0,900] }}>
        <Suspense fallback={null}>
          <ambientLight/>
          <directionalLight intensity={2} position={[0,0,50]} />
          <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
          <Model wall={wall} />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default App
