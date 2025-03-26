use contract::types::{AidsUsed, GameMode, UserActivity, SessionDetails};
use starknet::ContractAddress;

#[starknet::interface]
pub trait ILogiQuest<TContractState> {
    fn initialize_game_modes(ref self: TContractState, decimal: u8);
    fn get_game_modes(self: @TContractState, mode_id: u8) -> GameMode;
    fn update_player_progress(
        ref self: TContractState,
        player: ContractAddress,
        mode_id: u8,
        session_level: u32,
        day: u32,
        aids_used: AidsUsed,
        rewards_earned: u256,
    );
    fn get_player_rewards(self: @TContractState, player: ContractAddress) -> u256;

    // New functions for user activity tracking
    fn update_user_activity(
        ref self: TContractState,
        player: ContractAddress,
        mode_id: u8,
        session_details: SessionDetails,
        aids_used: AidsUsed,
        day: u32,
    );
    fn get_user_activity(
        self: @TContractState, player: ContractAddress, mode_id: u8
    ) -> UserActivity;
    fn get_daily_challenge_activity(
        self: @TContractState, player: ContractAddress, day: u32
    ) -> UserActivity;

    fn set_question_options(
        self: @TContractState, options: Span<felt252>, answer: felt252, randomize_order: bool
    ) -> Span<felt252>;
}
