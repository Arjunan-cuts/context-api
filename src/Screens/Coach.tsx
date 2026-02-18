import Ionicons from 'react-native-vector-icons/Ionicons';
import { FlatList, Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import { useAppSelector } from '../Hooks/reduxHooks';
import YoutubeIframe, { getYoutubeMeta, YoutubeIframeRef } from "react-native-youtube-iframe";
import { useEffect, useState, useRef } from 'react';


export function Coach() {
    const language = useAppSelector(state => state.lang.lang);
    const [playing, setPlaying] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedId, setSelectedId] = useState<any>(null);
    const Videos = ['NMjhjrBIrG8', 'UY75MQte4RU', 'r6zFZQm0hcc', 'NMjhjrBIrG8', 'xbpuPCbRCWQ','NMjhjrBIrG8','UY75MQte4RU','r6zFZQm0hcc','xbpuPCbRCWQ'];
    const [videometa, setVideometa] = useState<any>();

    const onVideopress = (itemId: string) => {
        setSelectedId(itemId);
        console.log("selected id ", itemId)
        setModalVisible(true);
    }
    return (

        <>
            <View style={{
                flex: 1,
                justifyContent: "center"
            }}>
                <View>

                    {
                        modalVisible &&
                        <VideoModal videoId={selectedId} onClose={() => setModalVisible(false)} videometa={videometa} />
                    }
                </View>

                <View style={{
                    flex: 1,
                    backgroundColor: "#030404",
                    paddingHorizontal: 10,
                    justifyContent: "center",
                    // marginTop:modalVisible ? 250 : 0
                }}>
                    <FlatList
                        data={Videos}
                        renderItem={({ item }) => (
                            <VideoItem videoId={item} onPress={onVideopress} videometa={setVideometa} />)
                        }
                    />
                </View>
            </View>
        </>
    )
}

const VideoItem = ({ videoId, onPress, videometa }) => {
    const [meta, setMeta] = useState<any>();
    useEffect(() => {
        getYoutubeMeta(videoId).then((data) => {
            setMeta(data);
            console.log("metadata of video", data)
        })
    }, [videoId])
    if (meta) {
        return (
            <>
                <View style={{
                    // backgroundColor:"#FFEFEF",
                    flex: 1,
                    flexDirection: "row",
                    marginTop: 15,
                    gap: 14
                }}>
                    <View style={{
                        // backgroundColor:"#F79393",
                        height: 95,
                        width: 155,
                        borderRadius: 10,
                        overflow: "hidden"
                    }}>
                        <TouchableOpacity onPress={() => {
                            onPress(videoId)
                            videometa(meta);
                        }}>
                            <Image source={{ uri: meta.thumbnail_url }} style={{ height: "100%", width: "100%" }} />
                        </TouchableOpacity>
                        <View style={{
                            height: 3,
                            width: "50%",
                            backgroundColor: "#FB0404",
                            zIndex: 10,
                            position: "absolute",
                            bottom: 0
                        }} />
                    </View>

                    <View style={{
                        // backgroundColor:"#93F7D7",
                        flex: 1,
                        gap: 2
                    }}>
                        <Text style={{
                            fontSize: 15,
                            color: "#E5E3E3"
                        }}>
                            {meta.title}
                        </Text>
                        <Text style={{
                            fontSize: 12,
                            color: "#B4B0B0"
                        }}>
                            {meta.author_name}
                        </Text>
                    </View>
                </View>
            </>
        )
    }
}

const VideoModal = ({ videoId, onClose, videometa }: any) => {
    const Modalref = useRef<typeof YoutubeIframe>(null);
    return (
        <View style={{
            backgroundColor: "#000000",
            justifyContent: "flex-start",
            width: "100%",
            zIndex: 5,
            
        }}>


            <View style={{
                // height:300,
                width: "100%",
                // backgroundColor: "red",
                paddingBottom:5
            }}>
                <View style={{
                    height: 210,
                    width: "100%"
                }}>
                    <YoutubeIframe
                        videoId={videoId}
                        ref={Modalref}
                        height={210}
                        width="100%"
                    />
                </View>
                <Text style={{
                    color: "white",
                    fontWeight: "700",
                    fontSize: 17,
                    marginTop:10
                    // fontFamily:"Lora-Bold"
                }}>{videometa.title}</Text>
                 <Text style={{
                    fontSize: 11,
                    color: "#CAC7C7"
                }}>16M views  2 months ago    ...more</Text>
                <View style={{
                    marginTop:10,
                    flexDirection:"row",
                    // justifyContent:"center",
                    alignItems:"center",
                    justifyContent:"space-between"
                
                }}><View style={{
                    // marginTop:10,
                    flexDirection:"row",
                    // justifyContent:"center",
                    alignItems:"center",
                    gap:10,
                    
                }}>
                    <Image source={{uri:videometa.thumbnail_url}} style={{
                        height:50,
                        width:50,
                        borderRadius:50,
                        marginLeft:10
                    }}/>
                     <Text style={{
                    fontSize: 16,
                    color: "#FFFFFF"
                }}>{videometa.author_name}</Text>
                </View>
                <TouchableOpacity style={{
                    padding:10,
                    backgroundColor:"#FF0000",
                    borderRadius:50,
                    marginRight:2
                }}>
                     <Text style={{
                    fontSize: 15,
                    color: "#FFFFFF"
                }}>Subscribe</Text>
                </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}