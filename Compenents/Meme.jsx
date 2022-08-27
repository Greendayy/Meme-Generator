import React from "react";
import { useState,useEffect } from "react";

export default function Meme(){
const [meme,setMeme]=useState({
    topText:"",
    bottomText:"",
    randomImage:"http://i.imgflip.com/1bij.jpg" 
})    

const [allMemes,setAllMemes]=React.useSttate([])

useEffect(()=>{
    async function getMemes(){
        const res=await fetch("https://api.imgflip.com/get_memes")
        const data=await res.json()
        setAllMemes(data.memes)
    }
    getMemes()},[])

function getMemeImage(){
    const randomNumber=Math.floor(Math.random()*allMemes.length)
    const url=allMemes[randomNumber].url
    setMeme(prevMeme=>({
        ...prevMeme,randomImage:url
    }))
}

function handleChange(event){
    const [name,value]=event.target
    setMeme(prevMeme=>({
        ...prevMeme,[name]:value
    }))
}
        return(
<main>
<div className="form">
    <input 
    className="form-input" 
    type="text" 
    placeholder="top text"
    name="topText"
    value={meme.topText}
    onChange={handleChange}/>
    
    <input 
    className="form-input" 
    type="text" 
    placeholder="right text"
    name="bottomText"
    value={meme.bottomText}
    onChange={handleChange}/>

    <botton className="form-botton" onclick={getMemeImage}>
        Get a new meme image 🖼</botton>
    <img src=""/>
</div>
<div className="meme">
<img className="meme-imag" src=""/>
<h2 className="meme-text top">{meme.topText}</h2>
<h2 className="meme-text bottom">{meme.bottomText}</h2>
</div>
</main>
)
}