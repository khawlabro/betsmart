// BetSmart App - Main application class
class BetSmartApp {
    constructor() {
        this.bets = [];
        this.gameData = {};
        this.selectedSport = 'All Sports';
        this.sortBy = 'value';
        this.highValueOnly = false;
        this.init();
    }

    init() {
        this.loadData();
        this.render();
        this.setupEventListeners();
        this.checkDarkMode();
    }

    loadData() {
        // Sample betting data
        this.bets = [
            {
                id: 1,
                sport: "UFC",
                event: "Jon Jones vs Stipe Miocic",
                time: "2023-11-12T03:00:00Z",
                mainBet: {
                    type: "Moneyline",
                    pick: "Jon Jones",
                    odds: -180,
                    probability: 0.75,
                    value: 0.25,
                    confidence: "High"
                },
                otherBets: [
                    { type: "Round Total", pick: "Under 2.5", odds: +150, value: 0.15 },
                    { type: "Prop", pick: "Jones by KO/TKO", odds: +120, value: 0.20 }
                ],
                analysis: "Jones is significantly faster and more versatile than Miocic. Stipe's inactivity and age are major factors, having not competed since March 2021. Historically, Jones does well against slower opponents. Data shows Jones has a significant reach advantage and superior striking accuracy.",
                aiReasoning: "Our AI model analyzed over 150 UFC heavyweight fights and found that fighters returning after 18+ month layoffs have a 28% lower win rate. Jones' superior reach (84.5\" vs 80\") and striking accuracy (58% vs 52%) create a significant advantage in this matchup. His versatile skill set and takedown ability provide multiple paths to victory, while Miocic relies primarily on boxing. Jones' athleticism metrics have shown minimal decline despite his age, while Miocic's defensive metrics have deteriorated in his last three fights.",
                sportsbooks: [
                    { name: "DraftKings", odds: -180 },
                    { name: "FanDuel", odds: -175 },
                    { name: "BetMGM", odds: -185 }
                ]
            },
            {
                id: 2,
                sport: "NBA",
                event: "Boston Celtics vs LA Lakers",
                time: "2023-11-11T00:30:00Z",
                mainBet: {
                    type: "Point Spread",
                    pick: "Celtics -5.5",
                    odds: -110,
                    probability: 0.65,
                    value: 0.15,
                    confidence: "Medium"
                },
                otherBets: [
                    { type: "Total", pick: "Under 226.5", odds: -110, value: 0.05 },
                    { type: "Player Prop", pick: "J. Tatum Over 28.5 pts", odds: -115, value: 0.12 }
                ],
                analysis: "The Celtics have been dominant at home this season, winning by an average margin of 8.7 points. The Lakers are on the second night of a back-to-back, which historically has reduced their defensive efficiency by 4.2%. Advanced metrics show the Celtics' offensive rating is 6.8 points higher than the Lakers' defensive rating.",
                aiReasoning: "Our predictive model has identified several key factors favoring Boston. First, teams playing the second game of a back-to-back typically see a 3-5% drop in shooting efficiency and a 2-3% increase in turnovers. The Lakers' defensive rating drops from 110.2 to 114.4 in back-to-back situations. Second, the Celtics' three-point shooting volume (averaging 42.3 attempts per game) exploits the Lakers' 23rd-ranked perimeter defense. Finally, Boston's starting lineup has a +12.8 net rating at home, while the Lakers' road net rating is -3.2. The 5.5-point spread is lower than our projected 7.5-point margin.",
                sportsbooks: [
                    { name: "DraftKings", odds: -110 },
                    { name: "FanDuel", odds: -110 },
                    { name: "BetMGM", odds: -115 }
                ]
            },
            {
                id: 3,
                sport: "NHL",
                event: "Toronto Maple Leafs vs Montreal Canadiens",
                time: "2023-11-11T23:00:00Z",
                mainBet: {
                    type: "Puck Line",
                    pick: "Maple Leafs -1.5",
                    odds: +145,
                    probability: 0.52,
                    value: 0.30,
                    confidence: "High"
                },
                otherBets: [
                    { type: "Total", pick: "Over 6.5", odds: -105, value: 0.08 },
                    { type: "Player Prop", pick: "A. Matthews Anytime Goalscorer", odds: -120, value: 0.18 }
                ],
                analysis: "Toronto has dominated Montreal in recent meetings, winning 7 of the last 8 matchups with 5 of those wins coming by 2+ goals. The Maple Leafs' power play efficiency is currently at 27.3% while Montreal's penalty kill is struggling at 74.8%. Toronto's shot metrics (Corsi and Fenwick) show significant advantages in puck possession.",
                aiReasoning: "Our AI system has identified this as a high-value opportunity based on multiple statistical indicators. Toronto's power play success rate of 27.3% against Montreal's 74.8% penalty kill creates a significant special teams mismatch. Historical matchup data shows Toronto has covered the -1.5 puck line in 62.5% of recent meetings (5 of 8). Advanced analytics reveal Toronto's Expected Goals For (xGF) is 3.4 compared to Montreal's 2.2, suggesting a projected goal differential of approximately 1.2. However, Toronto's finishing ability and Montreal's goaltending struggles amplify this gap. At +145 odds, the implied probability is only 40.8%, while our model calculates a 52% likelihood of Toronto winning by 2+ goals, creating substantial positive expected value.",
                sportsbooks: [
                    { name: "DraftKings", odds: +145 },
                    { name: "FanDuel", odds: +150 },
                    { name: "BetMGM", odds: +140 }
                ]
            },
            {
                id: 4,
                sport: "Soccer",
                event: "Manchester City vs Arsenal",
                time: "2023-11-12T16:00:00Z",
                mainBet: {
                    type: "Double Chance",
                    pick: "Arsenal or Draw",
                    odds: +120,
                    probability: 0.60,
                    value: 0.28,
                    confidence: "Medium"
                },
                otherBets: [
                    { type: "Total", pick: "Under 2.5 Goals", odds: +110, value: 0.12 },
                    { type: "Both Teams to Score", pick: "Yes", odds: -130, value: 0.08 }
                ],
                analysis: "Arsenal has improved defensively, conceding only 0.8 goals per game this season. Man City is missing key defensive personnel, which has resulted in conceding in 80% of their recent matches. xG (Expected Goals) models suggest this will be a tight match with Arsenal having a 38% chance to win and a 22% chance to draw.",
                aiReasoning: "Our statistical models highlight several factors that give Arsenal excellent value on the Double Chance market. Manchester City is experiencing defensive vulnerabilities with key absences, resulting in a 30% increase in high-quality chances conceded over their last five matches. Arsenal's improved defensive structure under Arteta has reduced their Expected Goals Against (xGA) by 0.4 goals per match compared to last season. Tactical analysis shows Arsenal's counter-attacking approach is well-suited against City's high defensive line, particularly with City missing their primary defensive midfielder. Combined win+draw probability for Arsenal is calculated at 60%, significantly higher than the 45.5% implied by the +120 odds. Arsenal has also avoided defeat in 3 of their last 5 meetings with City across all competitions, suggesting an improving head-to-head trend.",
                sportsbooks: [
                    { name: "DraftKings", odds: +120 },
                    { name: "FanDuel", odds: +125 },
                    { name: "BetMGM", odds: +115 }
                ]
            },
            {
                id: 5,
                sport: "Table Tennis",
                event: "Fan Zhendong vs Ma Long",
                time: "2023-11-11T14:00:00Z",
                mainBet: {
                    type: "Match Winner",
                    pick: "Fan Zhendong",
                    odds: -140,
                    probability: 0.70,
                    value: 0.20,
                    confidence: "High"
                },
                otherBets: [
                    { type: "Total Sets", pick: "Over 5.5", odds: -105, value: 0.15 },
                    { type: "First Set Winner", pick: "Fan Zhendong", odds: -120, value: 0.12 }
                ],
                analysis: "Fan Zhendong has won 8 of the last 10 matchups against Ma Long. Statistical analysis shows Fan's serve win percentage is currently at 68% compared to Ma Long's 63%. Fan is also showing better form recently with a 95% win rate in his last 20 matches compared to Ma Long's 85%.",
                aiReasoning: "Our AI analysis indicates substantial value on Fan Zhendong based on comprehensive match data. Fan holds an 80% win rate against Ma Long in their last 10 encounters, demonstrating a consistent edge in this matchup. Performance metrics from recent tournaments show Fan's first-serve win percentage (68%) and return efficiency (42% of points won on opponent's serve) exceed Ma Long's metrics. Age-related analysis is also significant: at 31, Ma Long has shown a 7% decline in movement efficiency metrics over the past 18 months, while Fan (25) remains at his physical peak. The betting odds of -140 imply a 58.3% win probability, substantially lower than our calculated 70% probability. Fan's recent tournament form (95% win rate) further supports this selection, especially considering his advantageous playing style against Ma Long's tactical approach.",
                sportsbooks: [
                    { name: "DraftKings", odds: -140 },
                    { name: "FanDuel", odds: -145 },
                    { name: "BetMGM", odds: -135 }
                ]
            },
            {
                id: 6,
                sport: "UFC",
                event: "Alex Pereira vs Jiří Procházka",
                time: "2023-11-12T04:00:00Z",
                mainBet: {
                    type: "Moneyline",
                    pick: "Alex Pereira",
                    odds: -135,
                    probability: 0.63,
                    value: 0.18,
                    confidence: "Medium"
                },
                otherBets: [
                    { type: "Method of Victory", pick: "Pereira by KO/TKO", odds: +130, value: 0.22 },
                    { type: "Round Total", pick: "Under 1.5", odds: +110, value: 0.15 }
                ],
                analysis: "Pereira has demonstrated superior striking power with a 73% knockout rate. Procházka is returning from a long layoff due to injury which historically reduces fighter effectiveness by 15-20%. Strike accuracy data shows Pereira landing 54% of significant strikes versus Procházka's 48%.",
                aiReasoning: "Our predictive fighting model identifies several key advantages for Pereira in this matchup. After analyzing Procházka's 18-month injury layoff, our data shows fighters returning from shoulder injuries specifically see a 17% reduction in striking output and a 22% decrease in defensive movement in their first fight back. Pereira's significant strike accuracy (54%) combined with his 73% knockout rate create a dangerous combination against Procházka's aggressive but sometimes defensively vulnerable style. While Procházka's unpredictability is a factor, Pereira's experience against unorthodox strikers (Israel Adesanya, Sean Strickland) has prepared him well. The striking power differential is notable: Pereira's last six knockouts have required an average of just 2.3 significant strikes per minute, 18% more efficient than the divisional average. At -135 odds, the implied probability is only 57.4%, which is lower than our calculated 63% probability based on style matchup, physical metrics, and the injury factor.",
                sportsbooks: [
                    { name: "DraftKings", odds: -135 },
                    { name: "FanDuel", odds: -130 },
                    { name: "BetMGM", odds: -140 }
                ]
            },
            {
                id: 7,
                sport: "NBA",
                event: "Golden State Warriors vs Denver Nuggets",
                time: "2023-11-12T02:00:00Z",
                mainBet: {
                    type: "Total",
                    pick: "Over 234.5",
                    odds: -110,
                    probability: 0.67,
                    value: 0.24,
                    confidence: "High"
                },
                otherBets: [
                    { type: "Moneyline", pick: "Warriors", odds: +130, value: 0.08 },
                    { type: "Player Prop", pick: "S. Curry Over 4.5 3PT Made", odds: -125, value: 0.18 }
                ],
                analysis: "The last 8 meetings between these teams have averaged 241.3 points. Both teams are top 5 in offensive efficiency while being bottom 10 in defensive rating. Pace metrics indicate this should be a high-possession game (~105 possessions) which contributes to higher scoring.",
                aiReasoning: "Our statistical models strongly favor the Over 234.5 based on multiple converging factors. Historical matchup data shows these teams have averaged 241.3 points in their last 8 meetings, significantly above the current total. The combined offensive ratings of these teams (117.2 for Golden State, 116.8 for Denver) against their defensive ratings (112.3 and 113.5) project to approximately 240 total points. Pace analysis is particularly relevant: Golden State plays at the 4th fastest pace in the NBA (103.2 possessions per game), while Denver has shown a 6% increase in pace when playing against top-10 pace teams. Three-point shooting volume is another key factor - these teams combine for 75.8 three-point attempts per game, and both defenses rank in the bottom third for three-point defense. The betting line of 234.5 with -110 odds implies a 52.4% probability, which our models calculate is significantly undervalued compared to the 67% likelihood of the game going over based on our simulations of 10,000 potential game outcomes.",
                sportsbooks: [
                    { name: "DraftKings", odds: -110 },
                    { name: "FanDuel", odds: -110 },
                    { name: "BetMGM", odds: -115 }
                ]
            },
            {
                id: 8,
                sport: "NHL",
                event: "Edmonton Oilers vs Calgary Flames",
                time: "2023-11-11T22:00:00Z",
                mainBet: {
                    type: "Moneyline",
                    pick: "Oilers",
                    odds: -125,
                    probability: 0.62,
                    value: 0.17,
                    confidence: "Medium"
                },
                otherBets: [
                    { type: "Total", pick: "Over 6.5", odds: -110, value: 0.20 },
                    { type: "Player Prop", pick: "C. McDavid 2+ Points", odds: -140, value: 0.12 }
                ],
                analysis: "The Battle of Alberta historically features high scoring--averaging 7.2 goals in the last 10 meetings. Edmonton's power play is converting at 30.2% which ranks 1st in the league, while Calgary's penalty kill is at a below-average 77.8%. The Oilers have won 6 of the last 8 meetings between these teams.",
                aiReasoning: "Our hockey analytics model identifies Edmonton as having a significant advantage in this Battle of Alberta matchup. The Oilers' league-leading 30.2% power play efficiency creates a substantial special teams advantage against Calgary's 77.8% penalty kill (ranked 20th). Historical data shows Edmonton winning 6 of the last 8 meetings, with their top line generating a 58.2% Corsi For percentage in those matchups. Calgary's defensive metrics have declined in their last 10 games, allowing 3.4 goals per game compared to their season average of 2.9. Edmonton's expected goals for (xGF) in this matchup is calculated at 3.8 compared to Calgary's 2.9. The Connor McDavid factor is significant - he has recorded multiple points in 7 of 9 career games at Calgary, and his line has a 62% expected goals share on the road this season. At -125, the implied probability is 55.6%, which our model indicates is undervalued compared to Edmonton's 62% win probability based on team strength metrics, special teams advantage, and recent form.",
                sportsbooks: [
                    { name: "DraftKings", odds: -125 },
                    { name: "FanDuel", odds: -130 },
                    { name: "BetMGM", odds: -125 }
                ]
            },
            {
                id: 9,
                sport: "Soccer",
                event: "Liverpool vs Brentford",
                time: "2023-11-12T14:00:00Z",
                mainBet: {
                    type: "Asian Handicap",
                    pick: "Liverpool -1.25",
                    odds: -105,
                    probability: 0.60,
                    value: 0.26,
                    confidence: "High"
                },
                otherBets: [
                    { type: "Total", pick: "Over 2.5 Goals", odds: -160, value: 0.08 },
                    { type: "First Goal Time", pick: "Before 27.5 minutes", odds: -120, value: 0.15 }
                ],
                analysis: "Liverpool is undefeated at Anfield this season with a +1.8 goal differential per game. Their xG at home is 2.7 goals per game while conceding only 0.9 xG. Brentford has struggled away from home, conceding in 85% of away matches and losing by 2+ goals in 40% of those games.",
                aiReasoning: "Our soccer prediction model identifies significant value on Liverpool -1.25 based on comprehensive match analysis. Liverpool's home performance metrics are exceptional: 2.7 expected goals for (xGF) versus just 0.9 expected goals against (xGA) at Anfield, creating a +1.8 xG differential. This aligns with their actual +1.8 goal differential per home game. Brentford's away form has been particularly vulnerable, losing by 2+ goals in 40% of their away matches and conceding in 85% of road games. The tactical matchup strongly favors Liverpool, as Brentford's defensive structure typically leaves space in transition areas where Liverpool's front three excel. Shot map analysis shows Brentford allowing 3.2 high-quality chances per away game (defined as >0.3 xG), while Liverpool creates 4.5 such chances per home game. Statistically, our simulations project Liverpool to win by exactly one goal in 28% of scenarios, by two goals in 32% of scenarios, and by 3+ goals in 27% of scenarios. With the -1.25 Asian handicap, half your stake wins if Liverpool wins by exactly one goal (with half returned), and your full stake wins if they win by 2+. At -105 odds, the implied probability is 51.2%, while our calculations show a 60% probability of profitability, creating significant positive expected value.",
                sportsbooks: [
                    { name: "DraftKings", odds: -105 },
                    { name: "FanDuel", odds: -110 },
                    { name: "BetMGM", odds: -100 }
                ]
            },
            {
                id: 10,
                sport: "Table Tennis",
                event: "Timo Boll vs Dimitrij Ovtcharov",
                time: "2023-11-11T10:00:00Z",
                mainBet: {
                    type: "Set Handicap",
                    pick: "Ovtcharov -1.5",
                    odds: +135,
                    probability: 0.55,
                    value: 0.29,
                    confidence: "Medium"
                },
                otherBets: [
                    { type: "Total Sets", pick: "Under 4.5", odds: +110, value: 0.12 },
                    { type: "Correct Score", pick: "Ovtcharov 3-1", odds: +350, value: 0.20 }
                ],
                analysis: "Head-to-head data shows Ovtcharov winning 7 of the last 10 matches against Boll, with 5 of those wins coming by a margin of 2+ sets. Ovtcharov's recent form includes an 85% win rate in his last 20 matches, while Boll is at 70%. Statistical analysis shows Ovtcharov having a 12% higher first serve win percentage.",
                aiReasoning: "Our table tennis analytical model identifies this handicap as having the highest value proposition of all today's matches. The historical head-to-head data strongly favors Ovtcharov, who has won 7 of their last 10 matches with 71% of those victories (5 of 7) coming by a margin of 2+ sets. This demonstrates a pattern of clear victories rather than narrow wins. Detailed performance metrics show Ovtcharov with a 12% higher first serve win percentage and a significantly better return efficiency (winning 38% of points on Boll's serve compared to Boll winning 26% on Ovtcharov's serve). Age-related performance decline is a critical factor: at 42, Boll has shown a measurable 9% reduction in lateral movement speed over the past 24 months, while Ovtcharov (35) maintains more consistent metrics. Style matchup analysis further favors Ovtcharov, whose aggressive topspin attack effectively counters Boll's more defensive approach. At +135 odds, the implied probability is 42.6%, while our calculated probability for Ovtcharov winning by 2+ sets is 55%, creating substantial positive expected value of 29% - the highest in our system today.",
                sportsbooks: [
                    { name: "DraftKings", odds: +135 },
                    { name: "FanDuel", odds: +140 },
                    { name: "BetMGM", odds: +130 }
                ]
            }
        ];
        
        // The Game data
        this.gameData = {
            currentDay: 2,
            completedDays: 1,
            startingAmount: 10,
            currentAmount: 25,
            bets: [
                {
                    day: 1,
                    sport: "UFC",
                    event: "Jon Jones vs Stipe Miocic",
                    bet: "Jon Jones",
                    betType: "Moneyline",
                    odds: -180,
                    amount: 10,
                    profit: 15,
                    completed: true,
                    won: true
                },
                {
                    day: 2,
                    sport: "NHL",
                    event: "Toronto Maple Leafs vs Montreal Canadiens",
                    bet: "Maple Leafs -1.5",
                    betType: "Puck Line",
                    odds: +145,
                    amount: 25,
                    potentialProfit: 36.25,
                    completed: false,
                    won: null
                }
            ],
            projections: [
                { day: 1, amount: 10 },
                { day: 2, amount: 25 },
                { day: 3, amount: 40 },
                { day: 4, amount: 65 },
                { day: 5, amount: 100 },
                { day: 6, amount: 150 },
                { day: 7, amount: 225 },
                { day: 8, amount: 350 },
                { day: 9, amount: 500 }
            ]
        };
    }

    render() {
        this.renderBets(this.filterAndSortBets());
    }

    setupEventListeners() {
        // Dark mode toggle
        const darkModeToggle = document.getElementById('darkModeToggle');
        if (darkModeToggle) {
            darkModeToggle.addEventListener('click', () => this.toggleDarkMode());
        }

        // Admin button
        const adminBtn = document.getElementById('adminBtn');
        if (adminBtn) {
            adminBtn.addEventListener('click', () => {
                this.showAdminModal();
                this.renderAdminBetsList();
            });
        }

        // Sport tabs
        const sportTabs = document.querySelectorAll('.tab');
        sportTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.selectedSport = e.target.getAttribute('data-sport');
                this.updateActiveSportTab();
                this.renderBets(this.filterAndSortBets());
            });
        });

        // Sort dropdown
        const sortOptions = document.getElementById('sortOptions');
        if (sortOptions) {
            sortOptions.addEventListener('change', (e) => {
                this.sortBy = e.target.value;
                this.renderBets(this.filterAndSortBets());
            });
        }

        // High value checkbox
        const highValueOnly = document.getElementById('highValueOnly');
        if (highValueOnly) {
            highValueOnly.addEventListener('change', (e) => {
                this.highValueOnly = e.target.checked;
                this.renderBets(this.filterAndSortBets());
            });
        }

        // Modal events
        const closeModal = document.getElementById('closeModal');
        const detailModal = document.getElementById('detailModal');
        if (closeModal && detailModal) {
            closeModal.addEventListener('click', () => this.hideDetailModal());
            detailModal.addEventListener('click', (e) => {
                if (e.target === detailModal) {
                    this.hideDetailModal();
                }
            });
        }

        // The Game button and modal
        const theGameBtn = document.getElementById('theGameBtn');
        const closeGameModal = document.getElementById('closeGameModal');
        const gameModal = document.getElementById('gameModal');
        
        if (theGameBtn && closeGameModal && gameModal) {
            theGameBtn.addEventListener('click', () => {
                this.showGameModal();
                this.updateGameProgress();
            });
            
            closeGameModal.addEventListener('click', () => this.hideGameModal());
            gameModal.addEventListener('click', (e) => {
                if (e.target === gameModal) {
                    this.hideGameModal();
                }
            });
        }

        // Admin modal events
        const closeAdminModal = document.getElementById('closeAdminModal');
        const adminModal = document.getElementById('adminModal');
        
        if (closeAdminModal && adminModal) {
            closeAdminModal.addEventListener('click', () => this.hideAdminModal());
            adminModal.addEventListener('click', (e) => {
                if (e.target === adminModal) {
                    this.hideAdminModal();
                }
            });
        }

        // Edit bet modal events
        const closeEditBetModal = document.getElementById('closeEditBetModal');
        const editBetModal = document.getElementById('editBetModal');
        
        if (closeEditBetModal && editBetModal) {
            closeEditBetModal.addEventListener('click', () => this.hideEditBetModal());
            editBetModal.addEventListener('click', (e) => {
                if (e.target === editBetModal) {
                    this.hideEditBetModal();
                }
            });
        }

        // Admin buttons
        const addBetBtn = document.getElementById('addBetBtn');
        if (addBetBtn) {
            addBetBtn.addEventListener('click', () => this.showAddBetModal());
        }

        const saveBetBtn = document.getElementById('saveBetBtn');
        if (saveBetBtn) {
            saveBetBtn.addEventListener('click', () => this.saveBet());
        }

        const deleteBetBtn = document.getElementById('deleteBetBtn');
        if (deleteBetBtn) {
            deleteBetBtn.addEventListener('click', () => this.deleteBet());
        }

        // For demo: Add click events to diamonds to simulate progress
        const diamonds = document.querySelectorAll('.diamond');
        diamonds.forEach(diamond => {
            diamond.addEventListener('click', (e) => {
                const day = parseInt(e.currentTarget.getAttribute('data-day'));
                if (day === this.gameData.currentDay) {
                    this.completeCurrentDay(true);
                }
            });
        });
    }

    showAdminModal() {
        const adminModal = document.getElementById('adminModal');
        if (adminModal) {
            adminModal.classList.add('active');
        }
    }

    hideAdminModal() {
        const adminModal = document.getElementById('adminModal');
        if (adminModal) {
            adminModal.classList.remove('active');
        }
    }

    showEditBetModal(betId) {
        const bet = this.bets.find(b => b.id === betId);
        const isNew = !bet;
        
        const editBetModal = document.getElementById('editBetModal');
        const editBetModalTitle = document.getElementById('editBetModalTitle');
        
        if (editBetModal && editBetModalTitle) {
            editBetModalTitle.textContent = isNew ? 'Add New Bet' : `Edit Bet #${betId}`;
            
            // Fill form with bet data or empty for new bet
            document.getElementById('editBetId').value = betId || '';
            document.getElementById('editSport').value = bet?.sport || 'UFC';
            document.getElementById('editEvent').value = bet?.event || '';
            document.getElementById('editTime').value = bet?.time || '';
            
            // Main bet fields
            document.getElementById('editMainBetType').value = bet?.mainBet?.type || '';
            document.getElementById('editMainBetPick').value = bet?.mainBet?.pick || '';
            document.getElementById('editMainBetOdds').value = bet?.mainBet?.odds || '';
            document.getElementById('editMainBetProbability').value = bet?.mainBet?.probability || '';
            document.getElementById('editMainBetValue').value = bet?.mainBet?.value || '';
            document.getElementById('editMainBetConfidence').value = bet?.mainBet?.confidence || 'High';
            
            // Analysis fields
            document.getElementById('editAnalysis').value = bet?.analysis || '';
            document.getElementById('editAiReasoning').value = bet?.aiReasoning || '';
            
            editBetModal.classList.add('active');
        }
    }

    hideEditBetModal() {
        const editBetModal = document.getElementById('editBetModal');
        if (editBetModal) {
            editBetModal.classList.remove('active');
        }
    }

    showAddBetModal() {
        // Generate a new ID for the bet
        const newId = this.bets.length > 0 ? Math.max(...this.bets.map(b => b.id)) + 1 : 1;
        this.showEditBetModal(newId);
    }

    renderAdminBetsList() {
        const adminBetsList = document.getElementById('adminBetsList');
        if (!adminBetsList) return;
        
        adminBetsList.innerHTML = '';
        
        if (this.bets.length === 0) {
            adminBetsList.innerHTML = '<div class="no-bets">No bets found</div>';
            return;
        }
        
        this.bets.forEach(bet => {
            const betItem = document.createElement('div');
            betItem.className = 'admin-bet-item';
            betItem.innerHTML = `
                <div class="admin-bet-info">
                    <span class="admin-bet-sport">${bet.sport}</span>
                    <h4 class="admin-bet-event">${bet.event}</h4>
                    <span class="admin-bet-time">${this.formatDate(bet.time)}</span>
                </div>
                <div class="admin-bet-actions">
                    <button class="btn btn-primary edit-bet-btn" data-bet-id="${bet.id}">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                </div>
            `;
            adminBetsList.appendChild(betItem);
        });
        
        // Add event listeners to edit buttons
        document.querySelectorAll('.edit-bet-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const betId = parseInt(e.currentTarget.getAttribute('data-bet-id'));
                this.showEditBetModal(betId);
            });
        });
    }

    saveBet() {
        const betId = parseInt(document.getElementById('editBetId').value) || 0;
        const isNew = !this.bets.some(b => b.id === betId);
        
        const betData = {
            id: betId,
            sport: document.getElementById('editSport').value,
            event: document.getElementById('editEvent').value,
            time: document.getElementById('editTime').value,
            mainBet: {
                type: document.getElementById('editMainBetType').value,
                pick: document.getElementById('editMainBetPick').value,
                odds: parseFloat(document.getElementById('editMainBetOdds').value),
                probability: parseFloat(document.getElementById('editMainBetProbability').value),
                value: parseFloat(document.getElementById('editMainBetValue').value),
                confidence: document.getElementById('editMainBetConfidence').value
            },
            otherBets: [], // Can be extended to edit these as well
            analysis: document.getElementById('editAnalysis').value,
            aiReasoning: document.getElementById('editAiReasoning').value,
            sportsbooks: [
                { name: "DraftKings", odds: parseFloat(document.getElementById('editMainBetOdds').value) },
                { name: "FanDuel", odds: parseFloat(document.getElementById('editMainBetOdds').value) + 5 },
                { name: "BetMGM", odds: parseFloat(document.getElementById('editMainBetOdds').value) - 5 }
            ]
        };
        
        if (isNew) {
            this.bets.push(betData);
        } else {
            const index = this.bets.findIndex(b => b.id === betId);
            if (index !== -1) {
                this.bets[index] = betData;
            }
        }
        
        this.hideEditBetModal();
        this.renderAdminBetsList();
        this.renderBets(this.filterAndSortBets());
        
        // Show success message
        alert(`Bet ${isNew ? 'added' : 'updated'} successfully!`);
    }

    deleteBet() {
        const betId = parseInt(document.getElementById('editBetId').value);
        if (!betId) return;
        
        if (confirm('Are you sure you want to delete this bet?')) {
            this.bets = this.bets.filter(b => b.id !== betId);
            this.hideEditBetModal();
            this.renderAdminBetsList();
            this.renderBets(this.filterAndSortBets());
            alert('Bet deleted successfully!');
        }
    }

    filterAndSortBets() {
        let filteredBets = [...this.bets];
        
        // Filter by sport
        if (this.selectedSport !== 'All Sports') {
            filteredBets = filteredBets.filter(bet => bet.sport === this.selectedSport);
        }
        
        // Filter by value
        if (this.highValueOnly) {
            filteredBets = filteredBets.filter(bet => bet.mainBet.value >= 0.20);
        }
        
        // Sort the bets
        switch(this.sortBy) {
            case 'value':
                filteredBets.sort((a, b) => b.mainBet.value - a.mainBet.value);
                break;
            case 'odds':
                filteredBets.sort((a, b) => a.mainBet.odds - b.mainBet.odds);
                break;
            case 'confidence':
                const confidenceMap = { 'High': 3, 'Medium': 2, 'Low': 1 };
                filteredBets.sort((a, b) => confidenceMap[b.mainBet.confidence] - confidenceMap[a.mainBet.confidence]);
                break;
            case 'time':
                filteredBets.sort((a, b) => new Date(a.time) - new Date(b.time));
                break;
        }
        
        return filteredBets;
    }

    renderBets(betsToRender) {
        const container = document.getElementById('betsContainer');
        if (!container) return;
        
        container.innerHTML = '';

        if (betsToRender.length === 0) {
            container.innerHTML = '<div class="no-results">No betting opportunities match your current filters.</div>';
            return;
        }

        betsToRender.forEach(bet => {
            const card = this.createBetCard(bet);
            container.appendChild(card);
        });

        // Add event listeners to the entire bet cards
        document.querySelectorAll('.bet-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const betId = parseInt(card.getAttribute('data-bet-id'));
                this.showDetailModal(betId);
            });
        });
    }

    createBetCard(bet) {
        const valueClass = this.getValueClass(bet.mainBet.value);
        const confidenceBadgeClass = this.getConfidenceBadgeClass(bet.mainBet.confidence);
        
        const card = document.createElement('div');
        card.className = 'bet-card';
        card.setAttribute('data-bet-id', bet.id);
        
        card.innerHTML = `
            <div class="bet-card-content">
                <div class="bet-info-icon">
                    <i class="fas fa-info-circle text-primary"></i>
                </div>
                <div class="bet-header">
                    <span class="bet-sport">${bet.sport}</span>
                    <span class="bet-time">${this.formatDate(bet.time)}</span>
                </div>
                <h3 class="bet-title">${bet.event}</h3>
                <div class="bet-main">
                    <div class="bet-type-row">
                        <span class="bet-type">${bet.mainBet.type}</span>
                        <span class="bet-value ${valueClass}">Value: ${(bet.mainBet.value * 100).toFixed(0)}%</span>
                    </div>
                    <div class="bet-selection-row">
                        <div class="bet-pick-container">
                            <div class="bet-pick">${bet.mainBet.pick}</div>
                            <div class="bet-odds ${valueClass}">${this.formatAmericanOdds(bet.mainBet.odds)}</div>
                        </div>
                        <span class="confidence-badge ${confidenceBadgeClass}">${bet.mainBet.confidence} Confidence</span>
                    </div>
                </div>
                <div class="bet-footer">
                    <span class="best-odds">Best Odds: ${this.formatAmericanOdds(Math.max(...bet.sportsbooks.map(sb => sb.odds)))}</span>
                    <span class="view-analysis">View Analysis</span>
                </div>
            </div>
        `;
        
        return card;
    }

    updateActiveSportTab() {
        const sportTabs = document.querySelectorAll('.tab');
        sportTabs.forEach(tab => {
            const sport = tab.getAttribute('data-sport');
            
            // Remove active class from all tabs
            tab.classList.remove('tab-active');
            tab.classList.add('tab-inactive');
            
            // Add active class to selected tab
            if (sport === this.selectedSport) {
                tab.classList.remove('tab-inactive');
                tab.classList.add('tab-active');
            }
        });
    }

    showDetailModal(betId) {
        const bet = this.bets.find(b => b.id === betId);
        if (!bet) return;

        const modalTitle = document.getElementById('modalTitle');
        const modalContent = document.getElementById('modalContent');
        
        if (!modalTitle || !modalContent) return;
        
        modalTitle.textContent = bet.event;
        
        const sportsBookComparison = bet.sportsbooks.map(sb => 
            `<div class="odds-comparison-row">
                <span>${sb.name}</span>
                <span class="odds-value">${this.formatAmericanOdds(sb.odds)}</span>
            </div>`
        ).join('');

        const otherBetsHtml = bet.otherBets.map(ob => 
            `<div class="other-bet-row">
                <div class="other-bet-info">
                    <span class="other-bet-type">${ob.type}: ${ob.pick}</span>
                    <span class="other-bet-odds">${this.formatAmericanOdds(ob.odds)}</span>
                </div>
                <div class="other-bet-value ${this.getValueClass(ob.value)}">Value: ${(ob.value * 100).toFixed(0)}%</div>
            </div>`
        ).join('');

        const confidenceBadgeClass = this.getConfidenceBadgeClass(bet.mainBet.confidence);

        modalContent.innerHTML = `
            <div class="modal-section">
                <div class="modal-header-row">
                    <div class="bet-meta">
                        <span class="modal-sport">${bet.sport}</span>
                        <span class="modal-time">${this.formatDate(bet.time)}</span>
                    </div>
                    <span class="modal-confidence ${confidenceBadgeClass}">${bet.mainBet.confidence} Confidence</span>
                </div>
                
                <div class="main-bet-highlight">
                    <div class="bet-meta-row">
                        <span class="bet-type-label">${bet.mainBet.type}</span>
                        <span class="value-badge ${this.getValueClass(bet.mainBet.value)}">Value: ${(bet.mainBet.value * 100).toFixed(0)}%</span>
                    </div>
                    <div class="bet-selection-row">
                        <div class="bet-pick">${bet.mainBet.pick}</div>
                        <div class="bet-odds ${this.getValueClass(bet.mainBet.value)}">${this.formatAmericanOdds(bet.mainBet.odds)}</div>
                    </div>
                    <div class="implied-prob">
                        Implied Probability: ${(bet.mainBet.probability * 100).toFixed(0)}%
                    </div>
                </div>
            </div>

            <div class="modal-grid">
                <div class="modal-column">
                    <h3 class="modal-subtitle">Other Opportunities</h3>
                    <div class="other-bets-container">
                        ${otherBetsHtml || '<p class="no-other-bets">No additional bets available</p>'}
                    </div>
                </div>
                
                <div class="modal-column">
                    <h3 class="modal-subtitle">Odds Comparison</h3>
                    <div class="odds-comparison-container">
                        ${sportsBookComparison}
                    </div>
                </div>
            </div>
            
            <div class="modal-section">
                <h3 class="modal-subtitle">Summary</h3>
                <div class="analysis-container">
                    <p>${bet.analysis}</p>
                </div>
            </div>
            
            <div class="modal-section">
                <h3 class="modal-subtitle ai-title">
                    <i class="fas fa-brain text-primary"></i>
                    AI Analysis
                </h3>
                <div class="ai-analysis-container">
                    <p>${bet.aiReasoning}</p>
                </div>
            </div>
        `;
        
        const detailModal = document.getElementById('detailModal');
        if (detailModal) {
            detailModal.classList.add('active');
        }
    }

    hideDetailModal() {
        const detailModal = document.getElementById('detailModal');
        if (detailModal) {
            detailModal.classList.remove('active');
        }
    }

    showGameModal() {
        const gameModal = document.getElementById('gameModal');
        if (gameModal) {
            gameModal.classList.add('active');
        }
    }

    hideGameModal() {
        const gameModal = document.getElementById('gameModal');
        if (gameModal) {
            gameModal.classList.remove('active');
        }
    }

    updateGameProgress() {
        document.querySelectorAll('.diamond').forEach(diamond => {
            const day = parseInt(diamond.getAttribute('data-day'));
            
            // Reset styling
            diamond.style.backgroundColor = '';
            diamond.querySelector('span').style.color = '';
            
            if (day < this.gameData.currentDay) {
                // Completed days
                diamond.style.backgroundColor = 'var(--secondary)';
                diamond.querySelector('span').style.color = 'var(--white)';
            } else if (day === this.gameData.currentDay) {
                // Current day
                diamond.style.backgroundColor = 'var(--primary)';
                diamond.querySelector('span').style.color = 'var(--white)';
            } else {
                // Future days
                diamond.style.backgroundColor = 'var(--gray-200)';
                diamond.querySelector('span').style.color = 'var(--gray-700)';
                
                if (document.body.classList.contains('dark')) {
                    diamond.style.backgroundColor = 'var(--gray-700)';
                    diamond.querySelector('span').style.color = 'var(--gray-300)';
                }
            }
        });
    }

    completeCurrentDay(won = true) {
        const currentBet = this.gameData.bets.find(bet => bet.day === this.gameData.currentDay);
        
        if (currentBet && !currentBet.completed) {
            currentBet.completed = true;
            currentBet.won = won;
            
            if (won) {
                // If won, update current amount
                this.gameData.currentAmount += currentBet.potentialProfit;
                this.gameData.completedDays++;
                
                // Prepare for next day
                this.gameData.currentDay++;
                
                // Light up the diamond
                const diamond = document.querySelector(`.diamond[data-day="${this.gameData.currentDay - 1}"]`);
                if (diamond) {
                    diamond.classList.add('diamond-pulse');
                    setTimeout(() => {
                        diamond.classList.remove('diamond-pulse');
                    }, 1500);
                }
                
                // Add next day's bet if we haven't reached day 9
                if (this.gameData.currentDay <= 9) {
                    this.gameData.bets.push({
                        day: this.gameData.currentDay,
                        sport: ['NHL', 'NBA', 'UFC', 'Soccer', 'Table Tennis'][Math.floor(Math.random() * 5)],
                        event: "Next Game TBD",
                        bet: "TBD",
                        betType: "TBD",
                        odds: +130,
                        amount: this.gameData.currentAmount,
                        potentialProfit: (this.gameData.currentAmount * 1.3).toFixed(2),
                        completed: false,
                        won: null
                    });
                }
            } else {
                // If lost, game is over
                alert("Sorry! You lost today's bet. The Game is over. You can restart from Day 1.");
                this.resetGame();
            }
            
            // Update the UI
            this.updateGameProgress();
        }
    }

    resetGame() {
        this.gameData.currentDay = 1;
        this.gameData.completedDays = 0;
        this.gameData.currentAmount = this.gameData.startingAmount;
        
        // Reset bets
        this.gameData.bets = [{
            day: 1,
            sport: "UFC",
            event: "Jon Jones vs Stipe Miocic",
            bet: "Jon Jones",
            betType: "Moneyline",
            odds: -180,
            amount: 10,
            potentialProfit: 15,
            completed: false,
            won: null
        }];
        
        // Update UI
        this.updateGameProgress();
    }

    toggleDarkMode() {
        document.body.classList.toggle('dark');
        const darkModeToggle = document.getElementById('darkModeToggle');
        if (darkModeToggle) {
            const moonIcon = darkModeToggle.querySelector('.fa-moon');
            const sunIcon = darkModeToggle.querySelector('.fa-sun');
            
            moonIcon.classList.toggle('hidden');
            sunIcon.classList.toggle('hidden');
        }
    }

    checkDarkMode() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.classList.add('dark');
            const darkModeToggle = document.getElementById('darkModeToggle');
            if (darkModeToggle) {
                const moonIcon = darkModeToggle.querySelector('.fa-moon');
                const sunIcon = darkModeToggle.querySelector('.fa-sun');
                
                moonIcon.classList.add('hidden');
                sunIcon.classList.remove('hidden');
            }
        }
        
        // Listen for changes in preferred color scheme
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            if (event.matches) {
                document.body.classList.add('dark');
            } else {
                document.body.classList.remove('dark');
            }
        });
    }

    formatAmericanOdds(odds) {
        return odds > 0 ? `+${odds}` : odds;
    }

    getValueClass(value) {
        if (value >= 0.25) return "value-high";
        if (value >= 0.15) return "value-medium";
        return "value-low";
    }

    getConfidenceBadgeClass(confidence) {
        switch (confidence) {
            case "High": return "confidence-high";
            case "Medium": return "confidence-medium";
            default: return "confidence-low";
        }
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true
        });
    }
}

// Initialize the app when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new BetSmartApp();
});