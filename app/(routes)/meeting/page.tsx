"use client";

import { ArrowLeft, CircleArrowOutUpRight, Hand, LogOut, MessageSquareMore, Mic, MicOff, ScreenShare, ScreenShareOff, UserRound, Video, VideoOff } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import Sidebar from "./Sidebar";
import { Button, ButtonGroup } from "@nextui-org/react";
import Image from "next/image";
import useSound from 'use-sound';

const Page = () => {
    const [participantCount, setParticipantCount] = useState(6);
    const [micOn, setMicOn] = useState(false);
    const [videoOn, setVideoOn] = useState(false);
    const [screenShare, setScreenShare] = useState(false);
    const [leaveRoom, setLeaveRoom] = useState(false);
    const [changeFlex, setChangeFlex] = useState(true);
    const [isInRoom, setIsInRoom] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const [playJoinSound] = useSound('/Sounds/join-sound.mp3', { volume: 0.2 });
    const [playEndSound] = useSound('./Sounds/end-sound.mp3', { volume: 0.2 });

    useEffect(() => {
        const timer = setInterval(() => {
            setElapsedTime(prevTime => prevTime + 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: any) => {
        const hours = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours < 10 ? '0' : ''}${hours}:${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };


    const increaseParticipant = () => {
        setParticipantCount(participantCount + 1);
        if (participantCount <= 4) {
            setChangeFlex(false);
        }
    };

    const decreaseParticipant = () => {
        setParticipantCount(participantCount - 1);
        if (participantCount <= 4) {
            setChangeFlex(false);
        }
    };

    const handleMicOn = () => {
        setMicOn(!micOn);
    }

    const handleVideoOn = () => {
        setVideoOn(!videoOn);
    }

    const handleScreenShare = () => {
        setScreenShare(!screenShare);
    }

    const handleLeaveRoom = () => {
        playEndSound();
        setLeaveRoom(true);
        setIsInRoom(false);
        toast("You have left the room", { className: "bg-red-500" });
    }

    const handleMessageOpen = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

    const handleParticipantsOpen = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

    const handleJoinRoom = () => {
        playJoinSound();
        setIsInRoom(true);
        toast.success("You have joined the room");
    }

    const renderParticipants = () => {
        return (
            <div className="w-full h-full p-4 flex flex-wrap justify-center items-center overflow-y-auto">
                {participantCount < 3 && [...Array(participantCount)].map((_, index) => (
                    <div key={index} className={`relative flex flex-col justify-center items-center gap-2 bg-[#272A35] ${participantCount === 1 ? 'md:w-[115vh] md:h-[90%] w-11/12 h-[48vw]' : participantCount === 2 ? 'md:w-[45%] md:h-[70%] gap-2 w-4/5 h-2/5' : 'md:min-w-96 md:w-[27%] md:h-[60%] gap-2 w-11/12'} bg-[#272A35] rounded-3xl m-4 flex justify-center items-center`}>
                        <Image src={'/userlogo.png'} alt={''} className="w-16 h-16" width={100} height={100} />
                        <p className="absolute bottom-0 left-0 m-4">Doraemon</p>
                    </div>
                ))}

                {participantCount === 3 && (
                    <>
                        <div className="relative md:w-[70%] md:h-[98%] h-[48%] w-full border rounded-3xl flex justify-center items-center bg-[#272A35]">
                            <Image src={'/userlogo.png'} alt={''} className="w-16 h-16" width={100} height={100} />
                            <p className="absolute bottom-0 left-0 m-4">Doraemon</p>
                        </div>
                        <div className="md:w-1/4 md:h-full w-full h-[100%] gap-4 rounded-3xl md:mt-0 mt-4 md:pl-4 flex flex-col justify-between items-center">
                            {[...Array(2)].map((_, index) => (
                                <div key={index} className="relative w-full h-full border rounded-3xl flex justify-center items-center bg-[#272A35]">
                                    <Image src={'/userlogo.png'} alt={''} className="w-16 h-16" width={100} height={100} />
                                    <p className="absolute bottom-0 left-0 m-4">Doraemon</p>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {participantCount === 4 && (
                    <>
                        <div className="relative md:w-[70%] md:h-[98%] h-[48%] w-full border rounded-3xl flex justify-center items-center bg-[#272A35]">
                            <Image src={'/userlogo.png'} alt={''} className="w-16 h-16" width={100} height={100} />
                            <p className="absolute bottom-0 left-0 m-4">Doraemon</p>
                        </div>
                        <div className="md:w-1/4 md:h-full w-full h-[133%] gap-4 rounded-3xl md:mt-0 mt-4 md:pl-4 flex flex-col justify-between items-center">
                            {[...Array(3)].map((_, index) => (
                                <div key={index} className="relative w-full h-full border rounded-3xl flex justify-center items-center bg-[#272A35]">
                                    <Image src={'/userlogo.png'} alt={''} className="w-16 h-16" width={100} height={100} />
                                    <p className="absolute bottom-0 left-0 m-4">Doraemon</p>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {participantCount > 4 && changeFlex && (
                    <>
                        <div className="relative md:w-[70%] md:h-[98%] h-[48%] w-full border rounded-3xl flex justify-center items-center bg-[#272A35]">
                            <Image src={'/userlogo.png'} alt={''} className="w-16 h-16" width={100} height={100} />
                            <p className="absolute bottom-0 left-0 m-4">Doraemon</p>
                        </div>
                        <div className="md:w-1/4 md:h-full w-full h-[133%] gap-4 rounded-3xl md:mt-0 mt-4 md:pl-4 flex flex-col justify-between items-center">
                            {[...Array(2)].map((_, index) => (
                                <div key={index} className="relative w-full h-full border rounded-3xl flex justify-center items-center bg-[#272A35]">
                                    <Image src={'/userlogo.png'} alt={''} className="w-16 h-16" width={100} height={100} />
                                    <p className="absolute bottom-0 left-0 m-4">Doraemon</p>
                                </div>
                            ))}
                            <div onClick={() => setChangeFlex(false)} className="relative w-full h-full border rounded-3xl flex justify-center items-center bg-[#272A35] cursor-pointer">
                                <p>{`+${participantCount - 4}`} more</p>
                            </div>
                        </div>
                    </>
                )}
                {participantCount > 4 && !changeFlex && (
                    <>
                        <ArrowLeft className="absolute top-20 left-0 m-4 cursor-pointer hover:bg-zinc-700 p-1 w-8 h-8 rounded-full z-20 bg-zinc-800" onClick={() => setChangeFlex(true)} />
                        {[...Array(participantCount)].map((_, index) => (
                            <div key={index} className="relative w-80 h-[43%] bg-[#272A35] rounded-3xl mx-4 flex justify-center items-center">
                                <Image src={'/userlogo.png'} alt={''} className="w-16 h-16" width={100} height={100} />
                                <p className="absolute bottom-0 left-0 m-4">Doraemon</p>
                            </div>
                        ))}
                    </>
                )}

            </div>
        );
    }

    return (
        <div className="main-Container flex flex-row bg-[#131217]">
            <div className={`flex flex-col transition-width duration-300`}>
                {/* bar */}
                {/* <div className='w-screen h-[10vh] bg-blue-400 flex justify-center items-center'>
                    <button disabled={participantCount === 1} className="bg-[#29903B] p-2 px-4 rounded-xl text-white text-medium hover:bg-[#36a048] font-bold cursor-pointer" onClick={decreaseParticipant}>Remove</button>
                    <p className="text-white text-xl font-bold mx-4">Participants -&gt; {participantCount}</p>
                    <button className="bg-[#29903B] p-2 px-4 rounded-xl text-white text-medium hover:bg-[#36a048] font-bold cursor-pointer" onClick={increaseParticipant}>Add</button>
                </div> */}
                {/* main meet area */}
                <div className={`w-screen transition-opacity duration-1000 ${isInRoom ? "inline-block" : "hidden"}`} style={{ height: 'calc(100% - 5rem)' }}>
                    {renderParticipants()}
                </div>
                <div className={`w-screen transition-opacity duration-1000 ${isInRoom ? "hidden" : "inline-block"}`} style={{ height: 'calc(100% - 5rem)' }}>
                    <div className="flex md:flex-row flex-col gap-10 justify-center md:justify-evenly items-center w-full h-full p-10">
                        <div className="flex flex-col gap-10 justify-center items-center md:w-3/5 w-full h-full md:mt-0 mt-10">
                            <h1 className="text-white md:text-3xl text-2xl font-bold">Elevate Your Team's Collaboration with Live Room Features</h1>
                            <Button onClick={() => handleJoinRoom()} className="bg-[--darkBtn] rounded-full h-12 flex justify-center items-center text-white text-2xl font-extrabold self-center self-start">Join Room</Button>
                        </div>
                        <div className="flex justify-center items-center w-4/5 md:w-2/5 h-full">
                            <video className="rounded-full object-cover p-0 m-0" autoPlay={true} muted loop src={'/team-meeting.mp4'} width={300} height={300} />
                        </div>
                    </div>
                </div>
                {/* Menu bar */}
                <div className={`${isInRoom ? 'justify-center md:justify-between' : 'justify-center'} w-screen h-20 flex  items-center px-4`}>
                    {isInRoom && (
                        <>
                            <div id="timer" className={`text-white text-lg justify-center items-center border-4 rounded-full h-12 px-2 border-neutral-800 hidden md:flex`}>
                                {formatTime(elapsedTime)}
                            </div>
                            <div className="flex flex-row gap-4 h-full justify-center items-center">
                                <Button size="sm" onClick={() => handleMicOn()} className={`bg-${micOn ? "[--darkBtn]" : "neutral-800"} rounded-full h-12 flex justify-center items-center text-white`} >{micOn ? <Mic /> : <MicOff />}</Button>
                                <Button size="sm" onClick={() => handleVideoOn()} className={`bg-${videoOn ? "[--darkBtn]" : "neutral-800"} rounded-full h-12 flex justify-center items-center text-white`}>{videoOn ? <Video /> : <VideoOff />}</Button>
                                <Button size="sm" onClick={() => handleScreenShare()} className={`bg-${screenShare ? "[--darkBtn]" : "neutral-800"} rounded-full h-12 flex justify-center items-center text-white`}>
                                    {screenShare ? <ScreenShare /> : <ScreenShareOff />}
                                </Button>
                                <Button size="md" onClick={() => handleLeaveRoom()} className="bg-[#FF4343] rounded-full h-12 flex justify-center items-center text-white">
                                    <CircleArrowOutUpRight className="rotate-45" />
                                </Button>
                            </div>
                            <div className="justify-center items-center h-full cursor-pointer hidden md:flex">
                                <div onClick={() => handleMessageOpen()} className="rounded-full w-12 h-12 flex justify-center items-center text-white">
                                    <MessageSquareMore />
                                </div>
                                <div onClick={() => handleParticipantsOpen()} className="rounded-full w-12 h-12 flex justify-center items-center text-white">
                                    <UserRound />
                                </div>
                            </div>
                        </>
                    )
                    }
                </div>
            </div>
            <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        </div>
    );
}

export default Page;
