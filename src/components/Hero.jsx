import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaCreditCard, FaVolumeUp, FaSpinner } from 'react-icons/fa';

const HeroSection = styled.section`
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding-top: 120px;
    text-align: center;
    position: relative;

    @media (min-width: 1100px) {
        text-align: left;
    }
`;

const HeroContent = styled(motion.div)`
    max-width: 800px;
    margin: 0 auto;
    z-index: 2;

    @media (min-width: 1100px) {
        margin: 0;
    }
`;

const Title = styled.h1`
    font-size: var(--font-size-xxl);
    margin-bottom: 20px;
    line-height: 1.1;
    text-transform: uppercase;
    font-weight: 700;
    
    .highlight {
        color: var(--primary);
        text-shadow: var(--neon-glow-primary);
    }
`;

const Subtitle = styled.p`
    font-size: var(--font-size-base);
    margin-bottom: 40px;
    opacity: 0.9;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    @media (min-width: 1100px) {
        margin-left: 0;
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;

    @media (min-width: 576px) {
        flex-direction: row;
        justify-content: center;
    }
     @media (min-width: 1100px) {
        justify-content: flex-start;
    }
`;

const Button = styled.a`
    /* ... existing .btn styles ... */
`;

const SpeechButton = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 15px 25px;
    background: transparent;
    color: var(--secondary);
    border: 2px solid var(--secondary);
    border-radius: 50px;
    font-weight: 700;
    transition: all 0.4s ease;
    cursor: pointer;
    text-transform: uppercase;
    font-size: var(--font-size-sm);

    &:hover {
        background: var(--secondary);
        color: var(--darker);
        box-shadow: var(--neon-glow-secondary);
    }

    svg {
        margin-right: 10px;
    }

    .spinner {
        animation: spin 1s linear infinite;
    }
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;


const Hero = () => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [audio, setAudio] = useState(null);

    const textToSpeak = "Gain the Ultimate Edge in Garena Free Fire. Experience unparalleled gaming performance with our premium, undetectable cheats, engineered for the Garena Free Fire Emulator.";

    const handleTextToSpeech = async () => {
        if (isSpeaking) return;
        setIsSpeaking(true);

        try {
            // Replace with your actual Cloudflare Worker URL
            const workerUrl = 'https://your-worker-name.your-subdomain.workers.dev';
            
            const response = await fetch(workerUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: textToSpeak }),
            });

            if (!response.ok) {
                throw new Error(`Cloudflare Worker Error: ${response.statusText}`);
            }

            const blob = await response.blob();
            const audioUrl = URL.createObjectURL(blob);
            const newAudio = new Audio(audioUrl);
            setAudio(newAudio);
            newAudio.play();
            newAudio.onended = () => setIsSpeaking(false);

        } catch (error) {
            console.error("Text-to-Speech failed:", error);
            setIsSpeaking(false);
        }
    };

    return (
        <HeroSection id="home">
            <div className="container">
                <HeroContent
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <Title>Gain the <span className="highlight">Ultimate Edge</span> in Garena Free Fire</Title>
                    <Subtitle>{textToSpeak}</Subtitle>
                    <ButtonGroup>
                        <Button href="#products" className="btn"><FaShoppingCart /> View Products</Button>
                        <Button href="#payment" className="btn btn-secondary"><FaCreditCard /> Payment Methods</Button>
                        <SpeechButton onClick={handleTextToSpeech} disabled={isSpeaking}>
                            {isSpeaking ? <FaSpinner className="spinner" /> : <FaVolumeUp />}
                            {isSpeaking ? 'Listening...' : 'Listen'}
                        </SpeechButton>
                    </ButtonGroup>
                </HeroContent>
            </div>
        </HeroSection>
    );
};

export default Hero;
