import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

const RoomPage = () => {
    const { roomId } = useParams();
    const meetingContainer = useRef(null);

    useEffect(() => {
        const myMeeting = async () => {
            try {
                const appID = 1257499454; // Ensure appID is a number
                const serverSecret = "a52d1ec2a2ca2c07dfabc86487221a5d";
                const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId, Date.now().toString(), "hello world");
                console.log("Generated Kit Token:", kitToken);
                const zc = ZegoUIKitPrebuilt.create(kitToken);
                if (!zc) {
                    throw new Error("Failed to create ZegoUIKitPrebuilt instance");
                }
                console.log("ZegoUIKitPrebuilt Instance:", zc);
                zc.joinRoom({
                    container: meetingContainer.current,
                    sharedLinks: [
                        {
                            name: "Copy Link",
                            url: `http://localhost:8080/room/${roomId}`,
                        },
                    ],
                    scenario: {
                        mode: ZegoUIKitPrebuilt.VideoConference,
                    },
                    showScreenSharingButton: true,
                });
            } catch (error) {
                console.error("Error in myMeeting:", error);
            }
        };
        myMeeting();
    }, [roomId]);

    return (
        <div ref={meetingContainer}></div>
    );
};

export default RoomPage;
