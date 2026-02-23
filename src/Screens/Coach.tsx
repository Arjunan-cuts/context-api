import { FlatList, Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import YoutubeIframe, { getYoutubeMeta, YoutubeIframeRef } from "react-native-youtube-iframe";
import { useEffect, useState, useRef, useCallback } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';

export function Coach() {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedId, setSelectedId] = useState<any>('NMjhjrBIrG8');
    const [videos, setVideos] = useState([
        'NMjhjrBIrG8',
        'UY75MQte4RU',
        'r6zFZQm0hcc',
        'xbpuPCbRCWQ'
    ]);
    const [videometa, setVideometa] = useState<any>();
    
    useEffect(() => {
        getYoutubeMeta(selectedId).then((data) => {
            setVideometa(data);
            console.log("metadata of video in first==================", data)
            setModalVisible(true);
        })
    }, [selectedId])

    const onVideopress = (itemId: string) => {
        setSelectedId(itemId);
        console.log("selected id ", itemId)
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
                }}>
                    <DraggableFlatList
                        data={videos}
                        renderItem={({ item, drag, isActive }) => (
                            <VideoItem videoId={item} onPress={onVideopress} videometa={setVideometa} drag={drag} isActive={isActive} />)
                        }
                        keyExtractor={item => item}
                        onDragEnd={({ data }) => { setVideos(data) }}
                    />
                </View>
            </View>
        </>
    )
}

const VideoItem = ({ videoId, onPress, videometa, isActive, drag }) => {
    const [meta, setMeta] = useState<any>();
    const [width, setWidth] = useState(0);

    const renderRightActions = () => {
        return (
          <TouchableOpacity
            style={{
                backgroundColor: "red",
                justifyContent: "center",
                alignItems: "center",
                minWidth:"30%"
            }}
          >
            <Text style={{ color: "white" }}>Delete</Text>
          </TouchableOpacity>
        );
      };
      
    useEffect(() => {
        getYoutubeMeta(videoId).then((data) => {
            setMeta(data);
            console.log("metadata of video", data)
        })

        getVideoProgress(videoId).then((da) => {
            setWidth(da.time);
        });
    }, [videoId])
    if (meta) {
        return (
            <>
           <Swipeable renderRightActions={() => renderRightActions()}
      friction={2}
      rightThreshold={90}
      >
                <ScaleDecorator>
                    <TouchableOpacity style={{
                        flex: 1,
                        flexDirection: "row",
                        marginTop: 15,
                        gap: 14
                    }}
                        onLongPress={drag}
                        disabled={isActive}
                    >
                        <View style={{
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
                                width: width > 0 ? `${width}%` : `${0}%`,
                                backgroundColor: "#FB0404",
                                zIndex: 10,
                                position: "absolute",
                                bottom: 0
                            }} />
                        </View>

                        <View style={{
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
                    </TouchableOpacity>
                </ScaleDecorator>
                </Swipeable>
            </>
        )
    }
}

const VideoModal = ({ videoId, onClose, videometa }: any) => {
    const Modalref = useRef<YoutubeIframeRef>(null);
    const [width, setWidth] = useState(0);
    const [playing, setPlaying] = useState(false)
    const ready = useRef(false);

    const getonReady = async () => {

        console.log("PLAYER READY");

        const saved = await getVideoProgress(videoId);

        if (saved?.time > 0) {
            console.log("Se to:", saved.time);

            Modalref.current?.seekTo(saved.time, true);
        }

        ready.current = true;
    };

    useEffect(() => {
        console.log("Inside UseEffect of Saving current time", playing)
        if (!ready.current) return;
        const timer = setInterval(() => {
            Modalref.current?.getCurrentTime()?.then((data: any) => {
                SaveVideoProgress(Modalref, {
                    videoId,
                    timeStamp: data
                });
            });
        }, 4000);
        return () => clearInterval(timer);

    }, [videoId]);

    return (
        <View style={{
            backgroundColor: "#000000",
            justifyContent: "flex-start",
            width: "100%",
            zIndex: 5,
        }}>
            <View style={{
                width: "100%",
                paddingBottom: 5
            }}>
                <View style={{
                    height: 210,
                    width: "100%"
                }}>
                    <YoutubeIframe
                        key={videoId}
                        videoId={videoId}
                        ref={Modalref}
                        height={210}
                        play={true}
                        width="100%"
                        onReady={getonReady}
                        onStateChange={(state) => {
                            if (state === "playing") {
                                console.log("STATE:", state);
                                setPlaying(true);
                                console.log("the state changed to true")
                            }
                        }}
                    />
                </View>
                <Text style={{
                    color: "white",
                    fontWeight: "700",
                    fontSize: 17,
                    marginTop: 10
                }}>
                    {videometa.title}
                </Text>
                <Text style={{
                    fontSize: 11,
                    color: "#CAC7C7"
                }}>16M views  2 months ago    ...more</Text>
                <View style={{
                    marginTop: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}><View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                }}>
                        <Image source={{ uri: videometa.thumbnail_url }} style={{
                            height: 50,
                            width: 50,
                            borderRadius: 50,
                            marginLeft: 10
                        }} />
                        <Text style={{
                            fontSize: 16,
                            color: "#FFFFFF"
                        }}>
                            {videometa.author_name}
                        </Text>
                    </View>
                    <TouchableOpacity style={{
                        padding: 10,
                        backgroundColor: "#FF0000",
                        borderRadius: 50,
                        marginRight: 2
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

const SaveVideoProgress = async (modalRef, { videoId, timeStamp }) => {
    const total = await modalRef.current?.getDuration();
    const Progress = Math.round((timeStamp / total) * 100);
    console.log("Total time prograsss---", Progress)
    const data = {
        Progress: Progress,
        time: timeStamp
    }
    AsyncStorage.setItem(videoId, JSON.stringify(data));
    console.log("in Saving item", data)
}

const getVideoProgress = async (videoId) => {
    const json = await AsyncStorage.getItem(videoId);
    console.log("Inside he get progress function")
    if (json !== null) {
        console.log("in retriving item", JSON.parse(json))
        return JSON.parse(json)
    } else {
        console.log("possbly the getting is not stored");
    }
    return { Progress: 0, time: 0 };
}