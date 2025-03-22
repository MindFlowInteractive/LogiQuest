#[derive(Copy, Drop, Serde, starknet::Store)]
pub struct GameMode {
    pub id: u8,
    pub name: felt252,
    pub description: felt252,
    // Game mode properties
    pub is_timed: bool,
    pub time_limit: u32,
    pub has_levels: bool,
    pub is_daily: bool,
    pub aids_allowed: AidsAllowed,
    // Reward Information
    pub base_reward: u256,
    pub time_bonus: u256,
    pub time_bonus_multiplier: u8,
    pub consecutive_bonus: u8,
}


#[derive(Copy, Drop, Serde, starknet::Store)]
pub struct AidsAllowed {
    pub audience_poll: bool,
    pub call_friend: bool,
    pub fifty_fifty: bool,
}

#[derive(Copy, Drop, Serde, starknet::Store)]
pub struct AidsUsed {
    pub audience_poll: bool,
    pub call_friend: bool,
    pub fifty_fifty: bool,
}

#[derive(Copy, Drop, Serde, starknet::Store)]
pub struct PlayerProgress {
    pub mode_id: u8,
    pub session_level: u32,
    pub day: u32,
    pub aids_used: AidsUsed,
    pub total_rewards: u256,
}

#[derive(Copy, Drop, Serde, starknet::Store)]
pub struct SessionDetails {
    pub completed: bool,
    pub timestamp: u64,
    pub duration: u32,  // in seconds
    pub score: u32,
}

#[derive(Copy, Drop, Serde, starknet::Store)]
pub struct DailyActivityCounter {
    pub completed_sessions: u32,
    pub total_duration: u32,  // in seconds
    pub day: u32,
}

#[derive(Copy, Drop, Serde, starknet::Store)]
pub struct AidUsageCounter {
    pub audience_poll_count: u32,
    pub call_friend_count: u32,
    pub fifty_fifty_count: u32,
}

#[derive(Copy, Drop, Serde, starknet::Store)]
pub struct UserActivity {
    pub player: starknet::ContractAddress,
    pub mode_id: u8,
    pub sessions_completed: u32,
    pub total_score: u32,
    pub total_time_spent: u32,  // in seconds
    pub last_session: SessionDetails,
    pub aid_usage: AidUsageCounter,
    pub current_streak: u32,
    pub best_streak: u32,
    pub daily_activity: DailyActivityCounter,  // used for daily challenge mode
}
