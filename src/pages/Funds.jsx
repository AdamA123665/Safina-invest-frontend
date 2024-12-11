import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { motion } from 'framer-motion';
import { Doughnut, Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { FiCheckCircle, FiExternalLink } from 'react-icons/fi';
import { FaChartLine, FaLeaf, FaShieldAlt, FaRegClock } from 'react-icons/fa';

const FundsPage = () => {
  const [selectedFund, setSelectedFund] = useState('macro');
  const [allocationModalOpen, setAllocationModalOpen] = useState(false);

  // THEME DATA for Dynamic Styling
  const themeData = {
    macro: {
      mainColor: '#228b22',
      lightBg: '#e8f5e9',
      heroGradient: 'linear-gradient(135deg, #ffffff 0%, #e8f5e9 100%)',
      chartColor: 'rgba(34,139,34,0.9)',
      chartBg: 'rgba(34,139,34,0.1)'
    },
    tech: {
      mainColor: '#000080',
      lightBg: '#e0e7fa',
      heroGradient: 'linear-gradient(135deg, #ffffff 0%, #e0e7fa 100%)',
      chartColor: 'rgba(0,0,128,0.9)',
      chartBg: 'rgba(0,0,128,0.1)'
    }
  };

  // FUND DATA
  const fundsData = {
    macro: {
      heroTitle: 'Macro Fund',
      heroDescription:
        'Exploiting global economic cycles, commodity trends, and FX markets to deliver steady, long-term gains.',
      ytdReturn: '+12%',
      lineData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            data: [1.0, 1.02, 1.04, 1.08, 1.1, 1.12],
            borderColor: themeData.macro.chartColor,
            backgroundColor: themeData.macro.chartBg,
            tension: 0.4,
            pointRadius: 0
          }
        ]
      },
      allocationData: {
        labels: ['Commodities', 'Fixed Income', 'Equities'],
        datasets: [
          {
            data: [50, 30, 20],
            backgroundColor: ['#228b22', '#4b9c4b', '#8fc98f'],
            hoverOffset: 4
          }
        ]
      },
      allocationBreakdown: [
        {
          asset: 'Commodities',
          percentage: '50%',
          rationale: 'Hedge against inflation, capture global growth'
        },
        {
          asset: 'Fixed Income',
          percentage: '30%',
          rationale: 'Stability and predictable income stream'
        },
        {
          asset: 'Equities',
          percentage: '20%',
          rationale: 'Long-term capital appreciation'
        }
      ],
      keyMetrics: [
        { label: 'Sharpe Ratio', value: '1.25' },
        { label: 'Volatility', value: '7%' },
        { label: 'Max Drawdown', value: '-5%' },
        { label: 'Annualized Return', value: '12%' }
      ],
      recentChanges: [
        {
          date: '2024-11-10',
          text: 'Increased commodity exposure in the Macro Fund by 5%',
          link: '/articles/macro-commodity-increase'
        }
      ],
      researchArticles: [
        {
          title: 'Global Commodities Outlook',
          summary: 'Analyzing price movements and long-term demand factors.'
        },
        {
          title: 'Emerging Market Debt Insights',
          summary: 'Exploring risk-return profiles in EM fixed income.'
        }
      ]
    },
    tech: {
      heroTitle: 'Tech Fund',
      heroDescription:
        'Focusing on breakthrough innovations, from AI to green tech, capturing tomorrow’s growth today.',
      ytdReturn: '+20%',
      lineData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            data: [1.0, 1.05, 1.1, 1.15, 1.18, 1.2],
            borderColor: themeData.tech.chartColor,
            backgroundColor: themeData.tech.chartBg,
            tension: 0.4,
            pointRadius: 0
          }
        ]
      },
      allocationData: {
        labels: ['AI & Machine Learning', 'Green Tech', 'Cloud Computing'],
        datasets: [
          {
            data: [40, 35, 25],
            backgroundColor: ['#000080', '#4b4bac', '#8f8fc9'],
            hoverOffset: 4
          }
        ]
      },
      allocationBreakdown: [
        {
          asset: 'AI & Machine Learning',
          percentage: '40%',
          rationale: 'Capturing explosive growth in intelligent systems'
        },
        {
          asset: 'Green Tech',
          percentage: '35%',
          rationale: 'Investing in sustainable energy and eco-innovation'
        },
        {
          asset: 'Cloud Computing',
          percentage: '25%',
          rationale: 'Leveraging scalable infrastructure & services growth'
        }
      ],
      keyMetrics: [
        { label: 'Sharpe Ratio', value: '1.45' },
        { label: 'Volatility', value: '9%' },
        { label: 'Max Drawdown', value: '-8%' },
        { label: 'Annualized Return', value: '20%' }
      ],
      recentChanges: [
        {
          date: '2024-11-15',
          text: 'Added a new AI-focused equity position in the Tech Fund',
          link: '/articles/tech-ai-addition'
        },
        {
          date: '2024-12-10',
          text: 'Increased allocation to green tech by 10% to capitalise on renewable energy trends',
          link: '/articles/tech-green-tech-increase'
        }
      ],
      researchArticles: [
        {
          title: 'The Future of AI in Energy',
          summary: 'How AI optimizes renewable energy grids and storage.'
        },
        {
          title: 'Cloud Computing Trends',
          summary: 'Forecasting the next wave of transformative cloud services.'
        }
      ]
    }
  };

  const currentFund = fundsData[selectedFund];
  const currentTheme = themeData[selectedFund];

  const HeroButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px; /* Adds spacing between buttons and badge */
  margin-top: 20px;
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 20px;
`;

const ShariaBadge = styled.div`
  background: ${props => props.mainColor};
  color: #fff;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 999px;
  font-size: 0.9rem;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  justify-content: center;
`;

  return (
    <PageContainer mainColor={currentTheme.mainColor} lightBg={currentTheme.lightBg}>
      <GlobalStyle />
      {/* Hero Section */}
<HeroSection heroGradient={currentTheme.heroGradient}>
  <ContentWrapper>
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <HeroHeading mainColor={currentTheme.mainColor}>
        Invest with Confidence, Guided by Ethics & Insights
      </HeroHeading>
      <HeroSubHeading>
        Our funds combine cutting-edge analysis, ethical principles, and proven strategies.
      </HeroSubHeading>
      <HeroButtonsWrapper>
        <HeroButtons>
          <HeroButton
            onClick={() => setSelectedFund('macro')}
            active={selectedFund === 'macro'}
            mainColor={currentTheme.mainColor}
          >
            Explore Macro Fund
          </HeroButton>
          <HeroButton
            onClick={() => setSelectedFund('tech')}
            active={selectedFund === 'tech'}
            mainColor={currentTheme.mainColor}
          >
            Explore Tech Fund
          </HeroButton>
        </HeroButtons>
        <ShariaBadge mainColor={currentTheme.mainColor}>
          <FiCheckCircle size={16} />
          Sharia Compliant
        </ShariaBadge>
      </HeroButtonsWrapper>
    </motion.div>
  </ContentWrapper>
</HeroSection>

      {/* Fund Overview */}
      <Section>
        <SectionTitle mainColor={currentTheme.mainColor}>{currentFund.heroTitle}</SectionTitle>
        <FundIntro>{currentFund.heroDescription}</FundIntro>
        <PerformanceContainer>
          <ChartContainer>
            <Line
              data={currentFund.lineData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: { x: { display: false }, y: { display: false } },
                plugins: { legend: { display: false } }
              }}
            />
          </ChartContainer>
          <PerformanceDetails>
            <h3>YTD Return: <span style={{ color: currentTheme.mainColor }}>{currentFund.ytdReturn}</span></h3>
            <KeyMetricsGrid>
              {currentFund.keyMetrics.map((metric, i) => (
                <div key={i}>
                  <MetricLabel>{metric.label}</MetricLabel>
                  <MetricValue>{metric.value}</MetricValue>
                </div>
              ))}
            </KeyMetricsGrid>
          </PerformanceDetails>
        </PerformanceContainer>
      </Section>

      {/* Allocation */}
      <Section>
        <SectionTitle mainColor={currentTheme.mainColor}>Portfolio Allocation</SectionTitle>
        <AllocationWrapper>
          <ChartWrapper>
            <Doughnut data={currentFund.allocationData} />
          </ChartWrapper>
          <AllocationInfo>
            <h3 style={{ color: currentTheme.mainColor }}>{currentFund.heroTitle}</h3>
            <p>
              This strategic allocation seeks to balance risk and reward, capturing growth opportunities while maintaining stability.
            </p>
            <LearnMoreLink mainColor={currentTheme.mainColor} onClick={() => setAllocationModalOpen(true)}>View Detailed Breakdown</LearnMoreLink>
          </AllocationInfo>
        </AllocationWrapper>
        {allocationModalOpen && (
          <ModalOverlay onClick={() => setAllocationModalOpen(false)}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <h4 style={{ color: currentTheme.mainColor }}>Detailed Allocation Breakdown</h4>
              <table>
                <thead>
                  <tr>
                    <th>Asset Class</th>
                    <th>Percentage</th>
                    <th>Rationale</th>
                  </tr>
                </thead>
                <tbody>
                  {currentFund.allocationBreakdown.map((row, index) => (
                    <tr key={index}>
                      <td>{row.asset}</td>
                      <td>{row.percentage}</td>
                      <td>{row.rationale}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <CloseButton mainColor={currentTheme.mainColor} onClick={() => setAllocationModalOpen(false)}>Close</CloseButton>
            </ModalContent>
          </ModalOverlay>
        )}
      </Section>

      {/* Recent Changes */}
      <Section>
        <SectionTitle mainColor={currentTheme.mainColor}>Recent Changes</SectionTitle>
        {currentFund.recentChanges.length > 0 ? (
          <Timeline>
            {currentFund.recentChanges.map((change, i) => (
              <TimelineItem key={i}>
                <TimelineIconContainer mainColor={currentTheme.mainColor}>
                  <FaRegClock size={20} />
                </TimelineIconContainer>
                <TimelineContent>
                  <ChangeDate>{change.date}</ChangeDate>
                  <ChangeText>{change.text}</ChangeText>
                  <ChangeLink mainColor={currentTheme.mainColor} href={change.link}>Read More <FiExternalLink /></ChangeLink>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        ) : (
          <NoChanges>No recent changes for this fund.</NoChanges>
        )}
      </Section>

      {/* Latest Research */}
      <Section>
        <SectionTitle mainColor={currentTheme.mainColor}>Latest Research</SectionTitle>
        <ArticlesGrid>
          {currentFund.researchArticles.map((article, idx) => (
            <ArticleCard key={idx}
              as={motion.div}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <h5 style={{ color: currentTheme.mainColor }}>{article.title}</h5>
              <p>{article.summary}</p>
              <LearnMoreLinkText mainColor={currentTheme.mainColor} href="/research">Read Full Article <FiExternalLink /></LearnMoreLinkText>
            </ArticleCard>
          ))}
        </ArticlesGrid>
      </Section>

      {/* Why Choose Our Funds */}
      <HighlightSection lightBg={currentTheme.lightBg}>
        <HighlightTitle mainColor={currentTheme.mainColor}>Why Choose Our Funds?</HighlightTitle>
        <HighlightFeatures>
          <FeatureBox>
            <FeatureIcon mainColor={currentTheme.mainColor}><FaChartLine /></FeatureIcon>
            <h4 style={{ color: currentTheme.mainColor }}>Data-Driven Strategies</h4>
            <p>We leverage both fundamental and systematic analysis for resilient performance.</p>
          </FeatureBox>
          <FeatureBox>
            <FeatureIcon mainColor={currentTheme.mainColor}><FaLeaf /></FeatureIcon>
            <h4 style={{ color: currentTheme.mainColor }}>Ethical & Sustainable</h4>
            <p>Our investment framework aligns with Sharia principles and supports sustainable growth.</p>
          </FeatureBox>
          <FeatureBox>
            <FeatureIcon mainColor={currentTheme.mainColor}><FaShieldAlt /></FeatureIcon>
            <h4 style={{ color: currentTheme.mainColor }}>Risk-Managed Growth</h4>
            <p>Our allocation and risk metrics ensure stable, long-term value creation.</p>
          </FeatureBox>
        </HighlightFeatures>
      </HighlightSection>
    </PageContainer>
  );
};

export default FundsPage;

///////////////////////////////////////
// STYLED COMPONENTS & STYLES BELOW //
///////////////////////////////////////

const GlobalStyle = createGlobalStyle`
  body, html {
    margin:0; padding:0;
    box-sizing:border-box;
  }
`;

const PageContainer = styled.div`
  background: #f9f9f9;
  color: #333;
  font-family: 'Inter', sans-serif;
  transition: background 0.3s;
`;

const HeroSection = styled.section`
  position: relative;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 100px 20px 60px;
  background: ${props => props.heroGradient};
  transition: background 0.3s;
`;

const ContentWrapper = styled.div`
  max-width: 1000px;
  text-align: center;
`;

const HeroHeading = styled.h1`
  font-size: 2.8rem;
  font-weight: 700;
  line-height: 1.2;
  color: ${props => props.mainColor};
  margin-bottom: 1rem;
`;

const HeroSubHeading = styled.p`
  font-size: 1.1rem;
  margin-bottom: 2rem;
  color: #555;
`;


const HeroButton = styled.button`
  background: ${props => props.active ? props.mainColor : 'transparent'};
  color: ${props => props.active ? '#fff' : props.mainColor};
  border: 2px solid ${props => props.mainColor};
  padding: 0.8rem 1.2rem;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background:${props => props.mainColor};
    color:#fff;
  }
`;



const Section = styled.section`
  padding: 80px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: ${props => props.mainColor};
  text-align: center;
  margin-bottom: 40px;
  position: relative;
  &:after {
    content: "";
    width: 50px;
    height: 4px;
    background: ${props => props.mainColor};
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -15px;
  }
`;

const FundIntro = styled.p`
  text-align: center;
  max-width: 700px;
  margin: 0 auto 40px;
  color: #555;
  line-height: 1.6;
`;

const PerformanceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
  @media(min-width:768px) {
    flex-direction: row;
    justify-content: center;
  }
`;

const ChartContainer = styled.div`
  width: 100%;
  max-width: 500px;
  height: 300px;
  position: relative;
`;

const PerformanceDetails = styled.div`
  text-align: center;
  h3 {
    font-size: 1.4rem;
    margin-bottom: 20px;
  }
`;

const KeyMetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2,1fr);
  gap: 20px;
  text-align: left;
  max-width: 300px;
  margin: 0 auto;
`;

const MetricLabel = styled.div`
  font-size:0.9rem;
  color:#666;
`;

const MetricValue = styled.div`
  font-size:1.2rem;
  font-weight:600;
  color:#333;
`;

const AllocationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  @media(min-width:768px) {
    flex-direction: row;
    gap: 60px;
    justify-content: center;
  }
`;

const ChartWrapper = styled.div`
  width: 250px;
  height: 250px;
  margin-bottom: 40px;
  @media(min-width:768px) {
    margin-bottom: 0;
  }
`;

const AllocationInfo = styled.div`
  max-width: 400px;
  h3 {
    font-size: 1.6rem;
    margin-bottom: 1rem;
  }
  p {
    line-height: 1.5;
    margin-bottom: 20px;
    color: #555;
  }
`;

const LearnMoreLink = styled.button`
  background: ${props => props.mainColor};
  color: #fff;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 600;
  &:hover {
    opacity:0.9;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top:0; left:0; right:0; bottom:0;
  background: rgba(0,0,0,0.4);
  display:flex;
  align-items:center;
  justify-content:center;
  z-index:999;
`;

const ModalContent = styled.div`
  background:#fff;
  padding: 40px;
  border-radius:10px;
  max-width:600px;
  width:90%;
  box-shadow:0 10px 30px rgba(0,0,0,0.1);
  table {
    width:100%;
    border-collapse:collapse;
    margin-bottom:20px;
    thead {
      background:#f0f0f0;
    }
    th,td {
      border:1px solid #ddd;
      padding:10px;
      text-align:left;
      font-size:0.95rem;
    }
    th {
      font-weight:600;
    }
  }
`;

const CloseButton = styled.button`
  background:${props => props.mainColor};
  color:#fff;
  border:none;
  padding:0.6rem 1rem;
  border-radius:20px;
  cursor:pointer;
  font-weight:600;
  &:hover {
    opacity:0.9;
  }
`;

const Timeline = styled.div`
  position: relative;
  margin: 40px 0;
  &:before {
    content:"";
    position:absolute;
    left: 50px;
    top:0;
    bottom:0;
    width:4px;
    background: #ddd;
  }
`;

const TimelineItem = styled.div`
  display:flex;
  align-items:flex-start;
  margin-bottom:40px;
  position:relative;
`;

const TimelineIconContainer = styled.div`
  width:100px;
  display:flex;
  justify-content:center;
  position:relative;
  z-index:1;
  &::before {
    content:"";
    width:20px; height:20px;
    background:${props => props.mainColor};
    border-radius:50%;
    position:absolute;
    top:0;
    left:50%;
    transform:translate(-50%,0);
    box-shadow:0 0 0 4px #fff;
  }
`;

const TimelineContent = styled.div`
  background:#fff;
  padding:20px;
  border-radius:10px;
  box-shadow:0 4px 10px rgba(0,0,0,0.05);
  margin-left:20px;
`;

const ChangeDate = styled.span`
  font-size:0.85rem;
  color:#666;
  display:block;
  margin-bottom:5px;
`;

const ChangeText = styled.p`
  font-size:1rem;
  margin:0 0 10px;
  color:#333;
`;

const ChangeLink = styled.a`
  font-size:0.9rem;
  color:${props => props.mainColor};
  text-decoration:underline;
  font-weight:600;
  &:hover {
    opacity:0.8;
  }
`;

const NoChanges = styled.p`
  text-align:center;
  color:#666;
`;

const ArticlesGrid = styled.div`
  display:grid;
  gap:30px;
  grid-template-columns:1fr;
  @media(min-width:768px) {
    grid-template-columns:repeat(2,1fr);
  }
`;

const ArticleCard = styled.div`
  background:#fff;
  padding:30px;
  border-radius:10px;
  box-shadow:0 4px 10px rgba(0,0,0,0.05);
  h5 {
    font-size:1.3rem;
    margin-bottom:10px;
  }
  p {
    margin-bottom:20px;
    line-height:1.5;
    color:#555;
  }
`;

const LearnMoreLinkText = styled.a`
  color:${props => props.mainColor};
  font-weight:600;
  text-decoration:underline;
  &:hover {
    opacity:0.8;
  }
`;

const HighlightSection = styled.section`
  background: ${props => props.lightBg};
  padding:80px 20px;
  text-align:center;
`;

const HighlightTitle = styled.h3`
  font-size:2rem;
  color:${props => props.mainColor};
  margin-bottom:60px;
  position:relative;
  &:after {
    content:"";
    width:50px;
    height:4px;
    background:${props => props.mainColor};
    position:absolute;
    left:50%;
    transform:translateX(-50%);
    bottom:-20px;
  }
`;

const HighlightFeatures = styled.div`
  display:flex;
  flex-direction:column;
  gap:40px;
  align-items:center;
  @media(min-width:768px) {
    flex-direction:row;
    justify-content:center;
  }
`;

const FeatureBox = styled.div`
  background:#fff;
  padding:40px 20px;
  border-radius:10px;
  box-shadow:0 4px 10px rgba(0,0,0,0.05);
  max-width:300px;
  text-align:center;
  h4 {
    font-size:1.4rem;
    margin-bottom:10px;
  }
  p {
    color:#555;
    line-height:1.5;
  }
`;

const FeatureIcon = styled.div`
  font-size:2rem;
  color:${props => props.mainColor};
  margin-bottom:20px;
`;
