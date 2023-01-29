import React from 'react';
import { useState,useEffect } from 'react';

const Paginationmaison = () => {
    const dataPost = [1,2,3];
    console.log(dataPost);
    //const[displayPost,setDisplayPost]=useState(false);
    //const[displayButton,setDisplayButton]=useState(false);

   const creatButton = () =>{
        //for(let i=0 ; i<= (dataPost.length) ; i++){
            alert("creat");
            React.createElement(
            "button",
            {
                className: "panel-btn-open",
                onClick: () => {console.log('clicked')}
            },
            "Open"
            )
       // }
    }

    const element = <h1>Bonjour, monde</h1>;
    
    return (      
        <div>
            {dataPost.length >= 1 ? //affiche boutons à partir de "n" posts
            //<button>1</button>
           
           creatButton()
            : ("")}     
            {element}
        </div>
    );
    
};

export default Paginationmaison;