import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'; // auto registers the necessary chart components
import { FiCheckCircle, FiExternalLink } from 'react-icons/fi';
import { FaGlobe, FaMicrochip } from 'react-icons/fa';

const FundsPage = () => {
  const [selectedFund, setSelectedFund] = useState('macro');
  const [allocationModalOpen, setAllocationModalOpen] = useState(false);
  const [researchFilter, setResearchFilter] = useState('all'); // 'all', 'macro', 'tech'
  const [flipMacro, setFlipMacro] = useState(false);
  const [flipTech, setFlipTech] = useState(false);

  // Allocation Data
  const allocationData = {
    labels: ['Commodities', 'Fixed Income', 'Equities'],
    datasets: [
      {
        data: [50, 30, 20],
        backgroundColor: ['#228b22', '#4b9c4b', '#8fc98f'],
        hoverOffset: 4
      }
    ]
  };

  // Dummy small chart data for the flipping cards
  const macroYTDData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr'],
    datasets: [
      {
        data: [1.0, 1.03, 1.08, 1.12],
        borderColor: 'rgba(34,139,34,0.9)',
        backgroundColor: 'rgba(34,139,34,0.1)',
        tension: 0.4,
        pointRadius: 0
      }
    ]
  };

  const techYTDData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr'],
    datasets: [
      {
        data: [1.0, 1.05, 1.1, 1.2],
        borderColor: 'rgba(0,0,128,0.9)',
        backgroundColor: 'rgba(0,0,128,0.1)',
        tension: 0.4,
        pointRadius: 0
      }
    ]
  };

  const recentChanges = [
    {
      date: '2024-11-10',
      text: 'Increased commodity exposure in the Macro Fund by 5%',
      link: '/articles/macro-commodity-increase'
    },
    {
      date: '2024-11-15',
      text: 'Added a new AI-focused equity position in the Tech Fund',
      link: '/articles/tech-ai-addition'
    }
  ];

  const researchArticles = {
    macro: [
      { title: 'Global Commodities Outlook', summary: 'Analyzing price movements and long-term demand factors.' },
      { title: 'Emerging Market Debt Insights', summary: 'Exploring risk-return profiles in EM fixed income.' }
    ],
    tech: [
      { title: 'The Future of AI in Energy', summary: 'How AI optimizes renewable energy grids and storage.' },
      { title: 'Cloud Computing Trends', summary: 'Forecasting the next wave of transformative cloud services.' }
    ]
  };

  const filteredArticles = (() => {
    if (researchFilter === 'all') return [...researchArticles.macro, ...researchArticles.tech];
    if (researchFilter === 'macro') return researchArticles.macro;
    if (researchFilter === 'tech') return researchArticles.tech;
  })();

  return (
    <PageContainer>
      {/* Hero Section */}
      <HeroSection>
        <PatternOverlay />
        <ShariaBadge>
          <FiCheckCircle size={16} />
          Sharia Compliant
        </ShariaBadge>
        <HeroContent
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1>Leveraging fundamental and systematic analysis to bring industry-leading returns</h1>
          <p>Ethically guided, data-driven investment strategies you can trust.</p>
          <HeroButtons>
            <HeroButton onClick={() => setSelectedFund('macro')} active={selectedFund === 'macro'}>
              Explore Macro Fund
            </HeroButton>
            <HeroButton onClick={() => setSelectedFund('tech')} active={selectedFund === 'tech'}>
              Explore Tech Fund
            </HeroButton>
          </HeroButtons>
        </HeroContent>
      </HeroSection>

      {/* Fund Overview (Flipping Cards) */}
      <Section>
        <SectionTitle>Our Funds</SectionTitle>
        <CardsContainer>
          {/* Macro Card */}
          <FundFlipCard onClick={() => setFlipMacro(!flipMacro)}>
            <CardInner flip={flipMacro}>
              <CardFront>
                <FrontIconWrapper><FaGlobe size={50} /></FrontIconWrapper>
                <h3>Macro Fund</h3>
                <p>
                  Our Macro Fund exploits global economic cycles, commodity trends, and FX markets to deliver steady, long-term gains.
                </p>
                <SmallNote>Click to view performance</SmallNote>
              </CardFront>
              <CardBack>
                <h4>YTD Return: <span>+12%</span></h4>
                <MiniChart>
                  <DoughnutChartContainer>
                    {/* Using a Line chart from react-chartjs-2 for YTD performance */}
                    <FundChart data={macroYTDData} />
                  </DoughnutChartContainer>
                </MiniChart>
                <Ratios>
                  <li><strong>Sharpe Ratio:</strong> 1.25</li>
                  <li><strong>Volatility:</strong> 7%</li>
                  <li><strong>Max Drawdown:</strong> -5%</li>
                </Ratios>
              </CardBack>
            </CardInner>
          </FundFlipCard>

          {/* Tech Card */}
          <FundFlipCard onClick={() => setFlipTech(!flipTech)}>
            <CardInner flip={flipTech}>
              <CardFront>
                <FrontIconWrapper><FaMicrochip size={50} /></FrontIconWrapper>
                <h3>Tech Fund</h3>
                <p>
                  Our Tech Fund focuses on breakthrough innovations, from AI to green tech, capturing tomorrow’s growth today.
                </p>
                <SmallNote>Click to view performance</SmallNote>
              </CardFront>
              <CardBack>
                <h4>YTD Return: <span>+20%</span></h4>
                <MiniChart>
                  <DoughnutChartContainer>
                    <FundChart data={techYTDData} />
                  </DoughnutChartContainer>
                </MiniChart>
                <Ratios>
                  <li><strong>Sharpe Ratio:</strong> 1.45</li>
                  <li><strong>Volatility:</strong> 9%</li>
                  <li><strong>Max Drawdown:</strong> -8%</li>
                </Ratios>
              </CardBack>
            </CardInner>
          </FundFlipCard>
        </CardsContainer>
      </Section>

      {/* Portfolio Allocation */}
      <Section>
        <SectionTitle>Portfolio Allocation</SectionTitle>
        <AllocationWrapper>
          <ChartWrapper>
            <Doughnut data={allocationData} />
          </ChartWrapper>
          <AllocationInfo>
            <h3>Macro Fund</h3>
            <p>
              A balanced mix of commodities, fixed income, and equities. This strategic allocation seeks stable growth and resilience.
            </p>
            <LearnMoreLink onClick={() => setAllocationModalOpen(true)}>View Detailed Breakdown</LearnMoreLink>
          </AllocationInfo>
        </AllocationWrapper>
        {allocationModalOpen && (
          <ModalOverlay onClick={() => setAllocationModalOpen(false)}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <h4>Detailed Allocation Breakdown</h4>
              <table>
                <thead>
                  <tr>
                    <th>Asset Class</th>
                    <th>Percentage</th>
                    <th>Rationale</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Commodities</td>
                    <td>50%</td>
                    <td>Hedge against inflation, capture global growth</td>
                  </tr>
                  <tr>
                    <td>Fixed Income</td>
                    <td>30%</td>
                    <td>Stability and predictable income stream</td>
                  </tr>
                  <tr>
                    <td>Equities</td>
                    <td>20%</td>
                    <td>Long-term capital appreciation</td>
                  </tr>
                </tbody>
              </table>
              <CloseButton onClick={() => setAllocationModalOpen(false)}>Close</CloseButton>
            </ModalContent>
          </ModalOverlay>
        )}
      </Section>

      {/* Recent Changes */}
      <Section>
        <SectionTitle>Recent Changes</SectionTitle>
        <ChangesList>
          {recentChanges.map((change, i) => (
            <ChangeItem key={i}>
              <ChangeDate>{change.date}</ChangeDate>
              <ChangeText>{change.text}</ChangeText>
              <ChangeLink href={change.link}>Read More <FiExternalLink /></ChangeLink>
            </ChangeItem>
          ))}
        </ChangesList>
      </Section>

      {/* Latest Research */}
      <Section>
        <SectionTitle>Latest Research</SectionTitle>
        <ToggleContainer>
          <FilterButton onClick={() => setResearchFilter('all')} active={researchFilter === 'all'}>All</FilterButton>
          <FilterButton onClick={() => setResearchFilter('macro')} active={researchFilter === 'macro'}>Macro</FilterButton>
          <FilterButton onClick={() => setResearchFilter('tech')} active={researchFilter === 'tech'}>Tech</FilterButton>
        </ToggleContainer>
        <ArticlesGrid>
          {filteredArticles.map((article, idx) => (
            <ArticleCard key={idx}
              as={motion.div}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <h5>{article.title}</h5>
              <p>{article.summary}</p>
              <LearnMore href="/research">Read Full Article <FiExternalLink /></LearnMore>
            </ArticleCard>
          ))}
        </ArticlesGrid>
      </Section>
    </PageContainer>
  );
};

export default FundsPage;

///////////////////////////////////////
// STYLED COMPONENTS & STYLES BELOW //
///////////////////////////////////////

const PageContainer = styled.div`
  background: #fafafa;
  color: #333;
  font-family: 'Inter', sans-serif;
`;

const HeroSection = styled.section`
  position: relative;
  min-height: 70vh;
  background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 60px 20px;
`;

const PatternOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(rgba(0,0,0,0.02) 1px, transparent 1px), radial-gradient(rgba(0,0,0,0.02) 1px, transparent 1px);
  background-position: 0 0, 25px 25px;
  background-size: 50px 50px;
  pointer-events: none;
`;

const ShariaBadge = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background: #228b22;
  color: #fff;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 0.8rem;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  box-shadow:0 2px 6px rgba(0,0,0,0.1);
`;

const HeroContent = styled(motion.div)`
  max-width: 800px;
  text-align: center;
  h1 {
    font-size: 2.4rem;
    margin-bottom: 1rem;
    font-weight: 700;
    line-height: 1.3;
  }
  p {
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }
`;

const HeroButtons = styled.div`
  display: inline-flex;
  gap: 20px;
`;

const HeroButton = styled.button`
  background: ${props => props.active ? '#228b22' : 'transparent'};
  color: ${props => props.active ? '#fff' : '#228b22'};
  border: 2px solid #228b22;
  padding: 0.8rem 1.2rem;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background:#228b22;
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
  color: #228b22;
  text-align: center;
  margin-bottom: 60px;
  position: relative;
  &:after {
    content: "";
    width: 50px;
    height: 4px;
    background: #228b22;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -20px;
  }
`;

// Cards Container
const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
  @media(min-width: 768px) {
    flex-direction: row;
    justify-content: center;
  }
`;

const FundFlipCard = styled.div`
  perspective: 1000px;
  width: 90%;
  max-width: 500px;
  margin: 0 auto;
  cursor: pointer;
`;

const CardInner = styled.div`
  position: relative;
  width: 100%;
  height: 350px;
  border-radius: 20px;
  transition: transform 0.8s cubic-bezier(0.175,0.885,0.32,1.275);
  transform-style: preserve-3d;
  box-shadow: 0 20px 40px rgba(0,0,0,0.05);
  background: #fff;
  ${props => props.flip && `transform: rotateY(180deg);`}
`;

const CardSide = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  backface-visibility: hidden;
  padding: 40px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CardFront = styled(CardSide)`
  background: #fff;
  h3 {
    font-size: 1.8rem;
    color: #228b22;
    margin-bottom: 1rem;
  }
  p {
    font-size: 1.1rem;
    text-align: center;
    line-height: 1.5;
    max-width:300px;
  }
`;

const CardBack = styled(CardSide)`
  background: #f7f7f7;
  transform: rotateY(180deg);
  justify-content: flex-start;
  h4 {
    font-size: 1.4rem;
    margin-bottom: 20px;
    text-align: center;
    span {
      color: #228b22;
      font-weight: 700;
    }
  }
`;

const FrontIconWrapper = styled.div`
  color: #228b22;
  margin-bottom: 20px;
`;

const SmallNote = styled.span`
  font-size: 0.9rem;
  color: #666;
  margin-top: 20px;
`;

const MiniChart = styled.div`
  width: 100%;
  height: 100px;
  margin-bottom: 20px;
`;

const Ratios = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  li {
    margin-bottom: 8px;
    font-size: 0.95rem;
    strong {
      font-weight: 600;
      margin-right: 8px;
    }
  }
`;

const DoughnutChartContainer = styled.div`
  height:100%;
  width:100%;
`;

const FundChart = ({ data }) => {
  // A small line chart in place of a doughnut
  // We can just reuse Line chart from react-chartjs-2 but smaller if desired.
  // For brevity, using Doughnut isn't suitable for YTD line. Let's use a line chart:
  // But user only said doughnut for allocation. For YTD, let's use a Line chart.
  // Import line chart inside code:
  return (
    <canvas
      ref={canvas => {
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        new ChartJS(ctx, {
          type: 'line',
          data,
          options: {
            responsive:true,
            maintainAspectRatio:false,
            scales: { x:{display:false}, y:{display:false} },
            plugins:{ legend:{display:false} }
          }
        });
      }}
      style={{width:'100%', height:'100%'}}
    />
  );
};

// Allocation Section
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
    color: #228b22;
    margin-bottom: 1rem;
  }
  p {
    line-height: 1.5;
    margin-bottom: 20px;
  }
`;

const LearnMoreLink = styled.button`
  background: #228b22;
  color: #fff;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 600;
  &:hover {
    background: #1f7c1f;
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
  h4 {
    margin-bottom:20px;
    color:#228b22;
  }
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
    }
  }
`;

const CloseButton = styled.button`
  background:#228b22;
  color:#fff;
  border:none;
  padding:0.6rem 1rem;
  border-radius:20px;
  cursor:pointer;
  font-weight:600;
  &:hover {
    background:#1f7c1f;
  }
`;

// Recent Changes
const ChangesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ChangeItem = styled.div`
  background:#fff;
  padding:20px;
  border-radius:10px;
  box-shadow:0 4px 10px rgba(0,0,0,0.05);
  display:flex;
  flex-direction:column;
  gap:10px;
`;

const ChangeDate = styled.span`
  font-size:0.9rem;
  color:#666;
`;

const ChangeText = styled.p`
  font-size:1rem;
  margin:0;
`;

const ChangeLink = styled.a`
  font-size:0.9rem;
  color:#228b22;
  text-decoration:underline;
  font-weight:600;
  &:hover {
    color:#1f7c1f;
  }
`;

// Research
const ToggleContainer = styled.div`
  display:flex;
  gap:20px;
  justify-content:center;
  margin-bottom:40px;
`;

const FilterButton = styled.button`
  background:${props => props.active ? '#228b22' : 'transparent'};
  color:${props => props.active ? '#fff' : '#228b22'};
  border:2px solid #228b22;
  padding:0.5rem 1rem;
  border-radius:20px;
  cursor:pointer;
  font-weight:600;
  &:hover {
    background:#228b22;
    color:#fff;
  }
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
    color:#228b22;
    margin-bottom:10px;
  }
  p {
    margin-bottom:20px;
    line-height:1.5;
  }
`;

const LearnMore = styled.a`
  color:#228b22;
  font-weight:600;
  text-decoration:underline;
  &:hover {
    color:#1f7c1f;
  }
`;

export { FundsPage };
