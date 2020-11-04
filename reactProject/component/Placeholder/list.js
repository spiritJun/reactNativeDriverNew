import React,{useContext,useEffect} from 'react';
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade,
    Shine 
} from 'rn-placeholder';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
export default function PlaceHolderList(){
        return (
            <>
                <Placeholder
                    backgroundColor="#fff"
                    Animation={props => (
                        <Fade {...props} duration={500} style={{ backgroundColor: "#fff" }} />
                      )}
                    Left={()=><PlaceholderMedia style={{backgroundColor:'#ebebeb',width:50,height:50,marginRight:10}} />}
            >
                <PlaceholderLine width={80} height={20} style={{backgroundColor:'#ebebeb',radius:'20%'}} />
                <PlaceholderLine />
                <PlaceholderLine width={30} />
            </Placeholder>
            <Placeholder
                    // Animation={Fade}
                    Animation={props => (
                        <Fade {...props} duration={500} style={{ backgroundColor: "#fff" }} />
                      )}
                    Left={()=><PlaceholderMedia style={{backgroundColor:'#ebebeb', width:50,height:50,marginRight:10}} />}
            >
                <PlaceholderLine width={80} height={20} style={{backgroundColor:'#ebebeb',radius:'20%'}} />
                <PlaceholderLine />
                <PlaceholderLine width={30} />
            </Placeholder>
          </> 
        )
}