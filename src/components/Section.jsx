import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const SectionWrapper = styled.section`
    padding: 80px 0;
    position: relative;
    @media (min-width: 768px) {
        padding: 120px 0;
    }
`;

const SectionTitleContainer = styled(motion.div)`
    text-align: center;
    margin-bottom: 60px;
`;

const Title = styled.h2`
    font-size: var(--font-size-xl);
    margin-bottom: 20px;
    text-transform: uppercase;
    font-weight: 700;
    position: relative;
    display: inline-block;

    &::after {
        content: '';
        position: absolute;
        bottom: -15px;
        left: 50%;
        transform: translateX(-50%);
        width: 100px;
        height: 4px;
        background: linear-gradient(90deg, var(--primary), var(--secondary));
        border-radius: 2px;
    }
`;

const Subtitle = styled.p`
    max-width: 700px;
    margin: 25px auto 0;
    opacity: 0.9;
    font-size: var(--font-size-base);
`;

const Section = ({ id, title, subtitle, children }) => {
    return (
        <SectionWrapper id={id}>
            <div className="container">
                <SectionTitleContainer
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                >
                    <Title>{title}</Title>
                    <Subtitle>{subtitle}</Subtitle>
                </SectionTitleContainer>
                {children}
            </div>
        </SectionWrapper>
    );
};

export default Section;