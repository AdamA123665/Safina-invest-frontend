import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { motion } from 'framer-motion';
import { Doughnut, Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { FiCheckCircle, FiExternalLink } from 'react-icons/fi';
import { FaChartLine, FaLeaf, FaShieldAlt, FaRegClock, FaBrain, FaBalanceScale } from 'react-icons/fa';

const TacticalAssetAllocationPage = () => {
  // THEME for Styling
  const theme = {
    mainColor: '#006C5B', // A deep emerald green
    lightBg: '#ECFDF5',
    heroGradient: 'linear-gradient(135deg, #ffffff 0%, #ecfdf5 100%)',
    chartColor: 'rgba(0,108,91,0.9)',
    chartBg: 'rgba(0,108,91,0.1)'
  };

  // Example Data for TAA
  const data = {
    heroTitle: 'Tactical Asset Allocation',
    heroDescription:
      'Each month, we dynamically tilt the portfolio based on fundamental research and quantitative signals. This approach helps capture extra alpha and preserve capital, while adhering to ethical and sustainable principles.',
    ytdReturn: '+8%',
    lineData: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      datasets: [
        {
          data: [1.0, 1.01, 1.015, 1.03, 1.025, 1.04, 1.05, 1.06, 1.058, 1.08],
          borderColor: theme.chartColor,
          backgroundColor: theme.chartBg,
          tension: 0.4,
          pointRadius: 0
        }
      ]
    },
    allocationData: {
      labels: ['Equities', 'Fixed Income', 'Commodities', 'Alternative Assets'],
      datasets: [
        {
          data: [40, 30, 20, 10],
          backgroundColor: ['#006C5B', '#38B2A5', '#66D1C7', '#A8E8E0'],
          hoverOffset: 4
        }
      ]
    },
    allocationBreakdown: [
      { asset: 'Equities', percentage: '40%', rationale: 'Growth from quality companies and stable earnings' },
      { asset: 'Fixed Income', percentage: '30%', rationale: 'Steady income and downside protection' },
      { asset: 'Commodities', percentage: '20%', rationale: 'Inflation hedge and global macro trends' },
      { asset: 'Alternative Assets', percentage: '10%', rationale: 'Diversification and non-correlated returns' }
    ],
    keyMetrics: [
      { label: 'Sharpe Ratio', value: '1.20' },
      { label: 'Volatility', value: '6%' },
      { label: 'Max Drawdown', value: '-4%' },
      { label: 'Annualized Return', value: '8%' }
    ],
    monthlyAdjustments: [
      {
        date: '2024-11-01',
        text: 'Shifted 5% from Fixed Income to Equities based on improving corporate earnings forecasts.',
        link: '/articles/earnings-outlook'
      },
      {
        date: '2024-10-01',
        text: 'Added 3% Commodities allocation following quantitative signals indicating rising inflation expectations.',
        link: '/articles/inflation-signals'
      }
    ],
    researchArticles: [
      {
        title: 'Fundamental Analysis: Identifying Value in a Dynamic Market',
        summary: 'How deep research into company balance sheets and macro indicators informs monthly portfolio tilts.'
      },
      {
        title: 'Quantitative Signals: Leveraging Data for Tactical Shifts',
        summary: 'An exploration of the algorithms and models guiding timely reallocations.'
      }
    ]
  };

  const [allocationModalOpen, setAllocationModalOpen] = useState(false);

  return (
    <PageContainer>
      <GlobalStyle />
      {/* Hero Section */}
      <HeroSection heroGradient={theme.heroGradient}>
        <ContentWrapper>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <HeroHeading mainColor={theme.mainColor}>
              Gain an Edge with Tactical Asset Allocation
            </HeroHeading>
            <HeroSubHeading>
              {data.heroDescription}
            </HeroSubHeading>
            <HeroButtonsWrapper>
              <ShariaBadge mainColor={theme.mainColor}>
                <FiCheckCircle size={16} />
                Sharia Compliant
              </ShariaBadge>
            </HeroButtonsWrapper>
          </motion.div>
        </ContentWrapper>
      </HeroSection>

      {/* Strategy Overview */}
      <Section>
        <SectionTitle mainColor={theme.mainColor}>{data.heroTitle}</SectionTitle>
        <FundIntro>{data.heroDescription}</FundIntro>
        <PerformanceContainer>
          <ChartContainer>
            <Line
              data={data.lineData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: { x: { display: false }, y: { display: false } },
                plugins: { legend: { display: false } }
              }}
            />
          </ChartContainer>
          <PerformanceDetails>
            <h3>YTD Return: <span style={{ color: theme.mainColor }}>{data.ytdReturn}</span></h3>
            <KeyMetricsGrid>
              {data.keyMetrics.map((metric, i) => (
                <div key={i}>
                  <MetricLabel>{metric.label}</MetricLabel>
                  <MetricValue>{metric.value}</MetricValue>
                </div>
              ))}
            </KeyMetricsGrid>
          </PerformanceDetails>
        </PerformanceContainer>
      </Section>

      {/* How We Adjust the Portfolio */}
      <Section>
        <SectionTitle mainColor={theme.mainColor}>How Tactics are Chosen</SectionTitle>
        <ExplanationGrid>
          <ExplanationBox>
            <FeatureIcon mainColor={theme.mainColor}><FaBalanceScale /></FeatureIcon>
            <h4 style={{ color: theme.mainColor }}>Fundamental Research</h4>
            <p>We analyze balance sheets, economic indicators, and geopolitical trends to identify undervalued opportunities and mitigate risks.</p>
          </ExplanationBox>
          <ExplanationBox>
            <FeatureIcon mainColor={theme.mainColor}><FaBrain /></FeatureIcon>
            <h4 style={{ color: theme.mainColor }}>Quantitative Signals</h4>
            <p>Our algorithms and models detect shifts in market sentiment, volatility, and momentum, enabling timely and data-driven adjustments.</p>
          </ExplanationBox>
        </ExplanationGrid>
        <p style={{ textAlign: 'center', color:'#555', maxWidth:'600px', margin:'30px auto' }}>
          By blending human insight with machine intelligence, we ensure each monthly shift is both well-reasoned and precisely timed.
        </p>
      </Section>

      {/* Allocation */}
      <Section>
        <SectionTitle mainColor={theme.mainColor}>Current Allocation</SectionTitle>
        <AllocationWrapper>
          <ChartWrapper>
            <Doughnut data={data.allocationData} />
          </ChartWrapper>
          <AllocationInfo>
            <h3 style={{ color: theme.mainColor }}>{data.heroTitle}</h3>
            <p>
              This allocation represents our current tactical tilt. It adapts monthly, capturing opportunities and mitigating risks as market conditions evolve.
            </p>
            <LearnMoreLink mainColor={theme.mainColor} onClick={() => setAllocationModalOpen(true)}>View Detailed Breakdown</LearnMoreLink>
          </AllocationInfo>
        </AllocationWrapper>
        {allocationModalOpen && (
          <ModalOverlay onClick={() => setAllocationModalOpen(false)}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <h4 style={{ color: theme.mainColor }}>Detailed Allocation Breakdown</h4>
              <table>
                <thead>
                  <tr>
                    <th>Asset Class</th>
                    <th>Percentage</th>
                    <th>Rationale</th>
                  </tr>
                </thead>
                <tbody>
                  {data.allocationBreakdown.map((row, index) => (
                    <tr key={index}>
                      <td>{row.asset}</td>
                      <td>{row.percentage}</td>
                      <td>{row.rationale}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <CloseButton mainColor={theme.mainColor} onClick={() => setAllocationModalOpen(false)}>Close</CloseButton>
            </ModalContent>
          </ModalOverlay>
        )}
      </Section>

      {/* Recent Changes (Timeline) */}
      <Section>
        <SectionTitle mainColor={theme.mainColor}>Monthly Adjustments</SectionTitle>
        {data.monthlyAdjustments.length > 0 ? (
          <Timeline>
            {data.monthlyAdjustments.map((change, i) => (
              <TimelineItem key={i}>
                <TimelineIconContainer mainColor={theme.mainColor}>
                  <FaRegClock size={20} />
                </TimelineIconContainer>
                <TimelineContent>
                  <ChangeDate>{change.date}</ChangeDate>
                  <ChangeText>{change.text}</ChangeText>
                  <ChangeLink mainColor={theme.mainColor} href={change.link}>Read More <FiExternalLink /></ChangeLink>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        ) : (
          <NoChanges>No recent changes recorded.</NoChanges>
        )}
      </Section>

      {/* Latest Research */}
      <Section>
        <SectionTitle mainColor={theme.mainColor}>Latest Research & Insights</SectionTitle>
        <ArticlesGrid>
          {data.researchArticles.map((article, idx) => (
            <ArticleCard
              key={idx}
              as={motion.div}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <h5 style={{ color: theme.mainColor }}>{article.title}</h5>
              <p>{article.summary}</p>
              <LearnMoreLinkText mainColor={theme.mainColor} href="/research">Read Full Article <FiExternalLink /></LearnMoreLinkText>
            </ArticleCard>
          ))}
        </ArticlesGrid>
      </Section>

      {/* Why Choose Our TAA Approach */}
      <HighlightSection lightBg={theme.lightBg}>
        <HighlightTitle mainColor={theme.mainColor}>Why Embrace Tactical Asset Allocation?</HighlightTitle>
        <HighlightFeatures>
          <FeatureBox>
            <FeatureIcon mainColor={theme.mainColor}><FaChartLine /></FeatureIcon>
            <h4 style={{ color: theme.mainColor }}>Adaptive & Resilient</h4>
            <p>We adjust exposures as markets evolve, maintaining a balance between growth opportunities and capital preservation.</p>
          </FeatureBox>
          <FeatureBox>
            <FeatureIcon mainColor={theme.mainColor}><FaLeaf /></FeatureIcon>
            <h4 style={{ color: theme.mainColor }}>Ethical & Sustainable</h4>
            <p>Our selection process respects Sharia principles and prioritizes long-term environmental and social well-being.</p>
          </FeatureBox>
          <FeatureBox>
            <FeatureIcon mainColor={theme.mainColor}><FaShieldAlt /></FeatureIcon>
            <h4 style={{ color: theme.mainColor }}>Data-Driven & Informed</h4>
            <p>We integrate both quantitative models and fundamental insights to ensure our tilts are timely, rational, and effective.</p>
          </FeatureBox>
        </HighlightFeatures>
      </HighlightSection>
    </PageContainer>
  );
};

export default TacticalAssetAllocationPage;

///////////////////////////////////////
// STYLED COMPONENTS & STYLES BELOW //
///////////////////////////////////////

const GlobalStyle = createGlobalStyle`
  body, html {
    margin:0; padding:0;
    box-sizing:border-box;
    font-family:'Inter', sans-serif;
    color:#333;
  }
`;

const PageContainer = styled.div`
  background: #f9f9f9;
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
  text-align:center;
`;

const ContentWrapper = styled.div`
  max-width: 1000px;
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

const HeroButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
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

const ExplanationGrid = styled.div`
  display:flex;
  flex-direction:column;
  gap:40px;
  align-items:center;
  @media(min-width:768px) {
    flex-direction:row;
    justify-content:center;
  }
`;

const ExplanationBox = styled.div`
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
  padding:40px;
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
