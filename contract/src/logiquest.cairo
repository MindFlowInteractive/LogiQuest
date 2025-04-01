#[starknet::contract]
mod LogiQuest {
    use contract::interface::ILogiQuest;
    use contract::types::{
        AidsAllowed, AidsUsed, GameMode, PlayerProgress, UserActivity, SessionDetails,
        AidUsageCounter, DailyActivityCounter
    };
    use starknet::storage::{Map, StoragePointerReadAccess, StoragePointerWriteAccess};
    use starknet::{ContractAddress, get_caller_address, get_block_timestamp};
    use contract::utils::{entry_is_duplicate, contains_option, generate_random_list};


    #[storage]
    struct Storage {
        game_modes: Map<u8, GameMode>,
        player_progress: Map<
            (ContractAddress, u8), PlayerProgress,
        >, // (player, mode_id) -> progress
        player_total_rewards: Map<ContractAddress, u256>,
        initialize: bool,
        // New storage for user activity
        user_activity: Map<(ContractAddress, u8), UserActivity>, // (player, mode_id) -> activity
        claimed_base_reward: Map<(ContractAddress, u8), bool>,
        daily_challenge_activity: Map<
            (ContractAddress, u32), UserActivity
        >, // (player, day) -> daily challenge activity
    }

    // Constants for game mode IDs
    const CLASSIC_MODE: u8 = 0;
    const CHALLENGE_MODE: u8 = 1;
    const DAILY_CHALLENGE_MODE: u8 = 2;
    const TIME_BLITZ_MODE: u8 = 3;
    const PUZZLE_MODE: u8 = 4;
    const PRACTICE_MODE: u8 = 5;
    const ADVENTURE_MODE: u8 = 6;
    const ENDLESS_MODE: u8 = 7;


    #[abi(embed_v0)]
    impl LogiQuest of ILogiQuest<ContractState> {
        fn initialize_game_modes(ref self: ContractState, decimal: u8) {
            assert(!self.initialize.read(), 'Game already initialized');
            // Validate decimal parameter
            assert(decimal <= 18, 'Decimal too large');

            // Calculate the reward multiplier based on decimal
            let reward_multiplier = if decimal > 0 {
                // Example: if decimal is 2, multiplier is 100 (10^2)
                // This is a basic implementation - for a more robust solution,
                // you would calculate 10^decimal using a power function
                let mut multiplier: u256 = 1;
                let mut i: u8 = 0;
                while i < decimal {
                    multiplier *= 10;
                    i += 1;
                };
                multiplier
            } else {
                1
            };

            self
                .game_modes
                .write(
                    CLASSIC_MODE,
                    GameMode {
                        id: CLASSIC_MODE,
                        name: 'Classic',
                        description: 'Traditional LogiQuest gameplay',
                        is_timed: false,
                        time_limit: 0,
                        has_levels: true,
                        is_daily: false,
                        aids_allowed: AidsAllowed {
                            audience_poll: true, call_friend: true, fifty_fifty: true,
                        },
                        base_reward: 100 * reward_multiplier,
                        time_bonus: 0,
                        time_bonus_multiplier: 0,
                        consecutive_bonus: 10,
                    },
                );

            self
                .game_modes
                .write(
                    CHALLENGE_MODE,
                    GameMode {
                        id: CHALLENGE_MODE,
                        name: 'Challenge',
                        description: 'More difficult puzzles',
                        is_timed: true,
                        time_limit: 60,
                        has_levels: false,
                        is_daily: false,
                        aids_allowed: AidsAllowed {
                            audience_poll: true, call_friend: true, fifty_fifty: true,
                        },
                        base_reward: 200 * reward_multiplier,
                        time_bonus: 0,
                        time_bonus_multiplier: 1,
                        consecutive_bonus: 20,
                    },
                );

            self
                .game_modes
                .write(
                    DAILY_CHALLENGE_MODE,
                    GameMode {
                        id: DAILY_CHALLENGE_MODE,
                        name: 'Daily Challenge',
                        description: 'Daily challenge mode',
                        is_timed: true,
                        time_limit: 300,
                        has_levels: false,
                        is_daily: true,
                        aids_allowed: AidsAllowed {
                            audience_poll: false, call_friend: false, fifty_fifty: true,
                        },
                        base_reward: 300 * reward_multiplier,
                        time_bonus: 0,
                        time_bonus_multiplier: 1,
                        consecutive_bonus: 50,
                    },
                );

            self
                .game_modes
                .write(
                    TIME_BLITZ_MODE,
                    GameMode {
                        id: TIME_BLITZ_MODE,
                        name: 'Time Blitz',
                        description: 'Time-limited puzzles',
                        is_timed: true,
                        time_limit: 120,
                        has_levels: true,
                        is_daily: false,
                        aids_allowed: AidsAllowed {
                            audience_poll: true, call_friend: true, fifty_fifty: true,
                        },
                        base_reward: 400 * reward_multiplier,
                        time_bonus: 0,
                        time_bonus_multiplier: 1,
                        consecutive_bonus: 60,
                    },
                );

            self
                .game_modes
                .write(
                    PUZZLE_MODE,
                    GameMode {
                        id: PUZZLE_MODE,
                        name: 'Puzzle',
                        description: 'Puzzle mode',
                        is_timed: false,
                        time_limit: 0,
                        has_levels: true,
                        is_daily: false,
                        aids_allowed: AidsAllowed {
                            audience_poll: false, call_friend: false, fifty_fifty: false,
                        },
                        base_reward: 500 * reward_multiplier,
                        time_bonus: 0,
                        time_bonus_multiplier: 1,
                        consecutive_bonus: 70,
                    },
                );

            self
                .game_modes
                .write(
                    PRACTICE_MODE,
                    GameMode {
                        id: PRACTICE_MODE,
                        name: 'Practice',
                        description: 'Practice mode',
                        is_timed: false,
                        time_limit: 0,
                        has_levels: true,
                        is_daily: false,
                        aids_allowed: AidsAllowed {
                            audience_poll: false, call_friend: false, fifty_fifty: false,
                        },
                        base_reward: 700 * reward_multiplier,
                        time_bonus: 0,
                        time_bonus_multiplier: 1,
                        consecutive_bonus: 90,
                    },
                );

            self
                .game_modes
                .write(
                    ADVENTURE_MODE,
                    GameMode {
                        id: ADVENTURE_MODE,
                        name: 'Adventure',
                        description: 'Adventure mode',
                        is_timed: false,
                        time_limit: 0,
                        has_levels: true,
                        is_daily: false,
                        aids_allowed: AidsAllowed {
                            audience_poll: false, call_friend: false, fifty_fifty: false,
                        },
                        base_reward: 800 * reward_multiplier,
                        time_bonus: 0,
                        time_bonus_multiplier: 1,
                        consecutive_bonus: 100,
                    },
                );

            self
                .game_modes
                .write(
                    ENDLESS_MODE,
                    GameMode {
                        id: ENDLESS_MODE,
                        name: 'Endless',
                        description: 'Endless mode',
                        is_timed: false,
                        time_limit: 0,
                        has_levels: true,
                        is_daily: false,
                        aids_allowed: AidsAllowed {
                            audience_poll: false, call_friend: false, fifty_fifty: false,
                        },
                        base_reward: 1000 * reward_multiplier,
                        time_bonus: 0,
                        time_bonus_multiplier: 1,
                        consecutive_bonus: 120,
                    },
                );

            self.initialize.write(true);
        }

        fn get_game_modes(self: @ContractState, mode_id: u8) -> GameMode {
            // Ensure mode_id is valid
            assert(mode_id <= ENDLESS_MODE, 'Invalid game mode ID');

            self.game_modes.read(mode_id)
        }

        // Update a player's progress in a specific game mode
        fn update_player_progress(
            ref self: ContractState,
            player: ContractAddress,
            mode_id: u8,
            session_level: u32,
            day: u32,
            aids_used: AidsUsed,
            rewards_earned: u256,
        ) {
            // Ensure mode_id is valid
            assert(mode_id <= ENDLESS_MODE, 'Invalid game mode ID');

            // Only allow the player or an authorized address to update progress
            let caller = get_caller_address();
            assert(caller == player, 'Unauthorized');

            // Update player progress
            let progress = PlayerProgress {
                mode_id, session_level, day, aids_used, total_rewards: rewards_earned,
            };
            self.player_progress.write((player, mode_id), progress);

            // Update total rewards
            let current_rewards = self.player_total_rewards.read(player);
            self.player_total_rewards.write(player, current_rewards + rewards_earned);
        }

        // Get the total rewards earned by a player
        fn get_player_rewards(self: @ContractState, player: ContractAddress) -> u256 {
            self.player_total_rewards.read(player)
        }

        // Update user activity based on a completed session
        fn update_user_activity(
            ref self: ContractState,
            player: ContractAddress,
            mode_id: u8,
            session_details: SessionDetails,
            aids_used: AidsUsed,
            day: u32,
        ) {
            // Ensure mode_id is valid
            assert(mode_id <= ENDLESS_MODE, 'Invalid game mode ID');

            // Only allow the player or an authorized address to update activity
            let caller = get_caller_address();
            assert(caller == player, 'Unauthorized');

            // Get the game mode to check its properties
            let game_mode = self.game_modes.read(mode_id);

            // check/claim base rewards if not claimed already
            self._claim_base_reward(player, mode_id, game_mode.base_reward);

            // Initialize or update activity
            if mode_id == DAILY_CHALLENGE_MODE {
                // Special handling for Daily Challenge mode - track by day
                assert(game_mode.is_daily, 'Mode not configured as daily');

                // Check if we have existing activity for this day
                let mut activity = self._get_or_init_daily_activity(player, day, mode_id);

                // Update activity data
                activity.sessions_completed += 1;
                activity.total_score += session_details.score;
                activity.total_time_spent += session_details.duration;
                activity.last_session = session_details;

                //update player total score for the session
                let current_rewards = self.player_total_rewards.read(player);
                let session_score = session_details.score.into();
                self.player_total_rewards.write(player, session_score + current_rewards);

                // Update daily specific counters
                activity.daily_activity.completed_sessions += 1;
                activity.daily_activity.total_duration += session_details.duration;

                // Update aids usage
                if aids_used.audience_poll {
                    activity.aid_usage.audience_poll_count += 1;
                }
                if aids_used.call_friend {
                    activity.aid_usage.call_friend_count += 1;
                }
                if aids_used.fifty_fifty {
                    activity.aid_usage.fifty_fifty_count += 1;
                }

                // Update streak if session was completed successfully
                if session_details.completed {
                    activity.current_streak += 1;
                    if activity.current_streak > activity.best_streak {
                        activity.best_streak = activity.current_streak;
                    }
                } else {
                    activity.current_streak = 0; // Reset streak on failure
                }

                // Save the updated activity for this day
                self.daily_challenge_activity.write((player, day), activity);
            } else {
                // Standard handling for regular game modes - track by mode_id

                // Make sure we're not trying to use a non-daily mode with day parameter
                if day > 0 {
                    assert(game_mode.is_daily, 'Mode not configured as daily');
                }

                // Check if we have existing activity for this mode
                let mut activity = self._get_or_init_activity(player, mode_id);

                // Update activity data
                activity.sessions_completed += 1;
                activity.total_score += session_details.score;
                activity.total_time_spent += session_details.duration;
                activity.last_session = session_details;

                //update player total score for the session
                let current_rewards = self.player_total_rewards.read(player);
                let session_score = session_details.score.into();
                self.player_total_rewards.write(player, session_score + current_rewards);

                // For non-daily modes, update the day in daily_activity for reference
                activity.daily_activity.day = day;

                // Update aids usage
                if aids_used.audience_poll {
                    activity.aid_usage.audience_poll_count += 1;
                }
                if aids_used.call_friend {
                    activity.aid_usage.call_friend_count += 1;
                }
                if aids_used.fifty_fifty {
                    activity.aid_usage.fifty_fifty_count += 1;
                }

                // Update streak if session was completed successfully
                if session_details.completed {
                    activity.current_streak += 1;
                    if activity.current_streak > activity.best_streak {
                        activity.best_streak = activity.current_streak;
                    }
                } else {
                    activity.current_streak = 0; // Reset streak on failure
                }

                // Save the updated activity
                self.user_activity.write((player, mode_id), activity);
            }
        }

        // Get user activity for a specific game mode
        fn get_user_activity(
            self: @ContractState, player: ContractAddress, mode_id: u8
        ) -> UserActivity {
            // Ensure mode_id is valid
            assert(mode_id <= ENDLESS_MODE, 'Invalid game mode ID');

            // Get the game mode to check its properties
            let _game_mode = self.game_modes.read(mode_id);

            // Return user activity based on mode type
            if mode_id == DAILY_CHALLENGE_MODE {
                // For Daily Challenge, return the latest day's activity
                // In a real implementation, you might want to return a summary instead
                let current_day = self._get_current_day();
                self.daily_challenge_activity.read((player, current_day))
            } else {
                // For standard modes, return activity by mode
                self.user_activity.read((player, mode_id))
            }
        }

        // Get daily challenge activity for a specific day
        fn get_daily_challenge_activity(
            self: @ContractState, player: ContractAddress, day: u32
        ) -> UserActivity {
            self.daily_challenge_activity.read((player, day))
        }

        fn set_question_options(
            self: @ContractState, options: Span<felt252>, answer: felt252, randomize_order: bool
        ) -> Span<felt252> {
            assert(options.len() == 4, 'Invalid number of options');

            // Check for duplicates
            let mut i = 0;
            loop {
                if i == options.len() {
                    break;
                }
                assert(!entry_is_duplicate(*options.at(i), options), 'Duplicate options');
                i += 1;
            };

            // Check that answer is present in options
            assert(contains_option(answer, options), 'Answer not in options');

            // Randomize options order
            if randomize_order {
                let new_order = generate_random_list(0, 3, 4);
                let mut new_options = array![];
                i = 0;
                loop {
                    if i == options.len() {
                        break;
                    }
                    let new_i = *new_order.at(i);
                    new_options.append(*options.at(new_i.into()));
                    i += 1;
                };
                return new_options.span();
            }
            options
        }
    }

    // Helper functions (not exposed via public interface)
    #[generate_trait]
    impl LogiQuestHelperImpl of LogiQuestHelperTrait {
        // Helper to get or initialize user activity
        fn _get_or_init_activity(
            ref self: ContractState, player: ContractAddress, mode_id: u8
        ) -> UserActivity {
            // Try to read existing activity
            let existing = self.user_activity.read((player, mode_id));

            // Check if this is a new entry (sessions_completed will be 0 for new entries)
            if existing.sessions_completed == 0 {
                // Initialize a new activity record
                return UserActivity {
                    player,
                    mode_id,
                    sessions_completed: 0,
                    total_score: 0,
                    total_time_spent: 0,
                    last_session: SessionDetails {
                        completed: false, timestamp: get_block_timestamp(), duration: 0, score: 0,
                    },
                    aid_usage: AidUsageCounter {
                        audience_poll_count: 0, call_friend_count: 0, fifty_fifty_count: 0,
                    },
                    current_streak: 0,
                    best_streak: 0,
                    daily_activity: DailyActivityCounter {
                        completed_sessions: 0, total_duration: 0, day: 0,
                    },
                };
            }

            existing
        }

        // Helper to get or initialize daily challenge activity
        fn _get_or_init_daily_activity(
            ref self: ContractState, player: ContractAddress, day: u32, mode_id: u8
        ) -> UserActivity {
            // Try to read existing activity for this day
            let existing = self.daily_challenge_activity.read((player, day));

            // Check if this is a new entry
            if existing.sessions_completed == 0 {
                // Initialize a new activity record for this day
                return UserActivity {
                    player,
                    mode_id,
                    sessions_completed: 0,
                    total_score: 0,
                    total_time_spent: 0,
                    last_session: SessionDetails {
                        completed: false, timestamp: get_block_timestamp(), duration: 0, score: 0,
                    },
                    aid_usage: AidUsageCounter {
                        audience_poll_count: 0, call_friend_count: 0, fifty_fifty_count: 0,
                    },
                    current_streak: 0,
                    best_streak: 0,
                    daily_activity: DailyActivityCounter {
                        completed_sessions: 0, total_duration: 0, day,
                    },
                };
            }

            existing
        }

        fn _claim_base_reward(
            ref self: ContractState, player: ContractAddress, mode_id: u8, base_reward: u256
        ) {
            let claimed: bool = self.claimed_base_reward.read((player, mode_id));
            if !claimed {
                let current_rewards = self.player_total_rewards.read(player);
                self.player_total_rewards.write(player, current_rewards + base_reward);

                self.claimed_base_reward.write((player, mode_id), true);
            }
        }

        // Helper to get current day
        fn _get_current_day(self: @ContractState) -> u32 {
            // In a real implementation, this would calculate the current day
            // based on some reference time. For simplicity, we'll just use a placeholder.
            // You can implement a proper calculation using the block timestamp.
            let timestamp = get_block_timestamp();
            // Example: day since epoch (very simplified)
            (timestamp / 86400).try_into().unwrap()
        }
    }
}

