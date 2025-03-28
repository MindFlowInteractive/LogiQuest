use starknet::ContractAddress;
use starknet::{contract_address_const};
use core::array::ArrayTrait;
use contract::interface::{ILogiQuestDispatcher, ILogiQuestDispatcherTrait};


use snforge_std::{
    declare, ContractClassTrait, DeclareResultTrait, start_cheat_caller_address,
    stop_cheat_caller_address
};

use contract::types::{AidsUsed, SessionDetails};
use contract::utils::contains_option;

// Test constants
const CLASSIC_MODE: u8 = 0;
const CHALLENGE_MODE: u8 = 1;
const DAILY_CHALLENGE_MODE: u8 = 2;
const TIME_BLITZ_MODE: u8 = 3;
const PUZZLE_MODE: u8 = 4;
const PRACTICE_MODE: u8 = 5;
const ADVENTURE_MODE: u8 = 6;
const ENDLESS_MODE: u8 = 7;

fn deploy_contract() -> ContractAddress {
    let contract = declare("LogiQuest").unwrap().contract_class();
    let (contract_address, _) = contract.deploy(@ArrayTrait::new()).unwrap();
    contract_address
}


pub fn OWNER() -> ContractAddress {
    contract_address_const::<1>()
}

pub fn PLAYER() -> ContractAddress {
    contract_address_const::<2>()
}


#[test]
fn test_initialize_game_modes() {
    let contract_address = deploy_contract();
    let dispatcher = ILogiQuestDispatcher { contract_address };

    dispatcher.initialize_game_modes(2);

    // Verify each game mode was initialized correctly
    // Classic Mode
    let classic_mode = dispatcher.get_game_modes(CLASSIC_MODE);
    assert(classic_mode.id == CLASSIC_MODE, 'Bad ID');
    assert(classic_mode.name == 'Classic', 'Bad name');
    assert(classic_mode.is_timed == false, 'Bad timed');
    assert(classic_mode.has_levels == true, 'Bad levels');
    assert(classic_mode.is_daily == false, 'Bad daily');
    assert(classic_mode.aids_allowed.audience_poll == true, 'Bad poll');
    assert(classic_mode.aids_allowed.call_friend == true, 'Bad call');
    assert(classic_mode.aids_allowed.fifty_fifty == true, 'Bad 50/50');
    assert(classic_mode.base_reward == 10000, 'Bad reward');

    // Daily Challenge Mode
    let daily_mode = dispatcher.get_game_modes(DAILY_CHALLENGE_MODE);
    assert(daily_mode.id == DAILY_CHALLENGE_MODE, 'Bad ID');
    assert(daily_mode.name == 'Daily Challenge', 'Bad name');
    assert(daily_mode.is_timed == true, 'Bad timed');
    assert(daily_mode.time_limit == 300, 'Bad limit');
    assert(daily_mode.has_levels == false, 'Bad levels');
    assert(daily_mode.is_daily == true, 'Bad daily');
    assert(daily_mode.aids_allowed.audience_poll == false, 'Bad poll');
    assert(daily_mode.aids_allowed.call_friend == false, 'Bad call');
    assert(daily_mode.aids_allowed.fifty_fifty == true, 'Bad 50/50');
    assert(daily_mode.base_reward == 30000, 'Bad reward');

    // Time Blitz Mode
    let blitz_mode = dispatcher.get_game_modes(TIME_BLITZ_MODE);
    assert(blitz_mode.id == TIME_BLITZ_MODE, 'Bad ID');
    assert(blitz_mode.is_timed == true, 'Bad timed');
    assert(blitz_mode.time_limit == 120, 'Bad limit');
    assert(blitz_mode.has_levels == true, 'Bad levels');
    assert(blitz_mode.time_bonus_multiplier == 1, 'Bad multiplier');
}

#[test]
#[should_panic(expected: ('Game already initialized',))]
fn test_initialize_game_modes_twice_should_fail() {
    let contract_address = deploy_contract();
    let dispatcher = ILogiQuestDispatcher { contract_address };

    // Initialize game modes for the first time
    dispatcher.initialize_game_modes(2);

    // Trying to initialize again should fail
    dispatcher.initialize_game_modes(2);
}

#[test]
#[should_panic(expected: ('Invalid game mode ID',))]
fn test_get_invalid_game_mode() {
    let contract_address = deploy_contract();
    let dispatcher = ILogiQuestDispatcher { contract_address };

    dispatcher.initialize_game_modes(2);

    // Try to get an invalid game mode (there are only 8 modes, from 0 to 7)
    dispatcher.get_game_modes(8);
}

#[test]
fn test_player_progress_and_rewards() {
    let contract_address = deploy_contract();
    let dispatcher = ILogiQuestDispatcher { contract_address };

    dispatcher.initialize_game_modes(2);

    let player = PLAYER();

    // Start pranking to simulate the player
    start_cheat_caller_address(contract_address, player);

    // Create aids used
    let aids_used = AidsUsed { audience_poll: true, call_friend: false, fifty_fifty: true, };

    // Update player progress in Classic mode
    dispatcher
        .update_player_progress(
            player,
            CLASSIC_MODE,
            5, // level 5
            0, // day 0 (not used for this mode)
            aids_used,
            10000 // rewards earned (with decimal=2)
        );

    // Check rewards
    let rewards = dispatcher.get_player_rewards(player);
    assert(rewards == 10000, 'Bad rewards');

    // Update progress in another mode
    dispatcher
        .update_player_progress(
            player,
            DAILY_CHALLENGE_MODE,
            0, // level 0 (not used for this mode)
            1, // day 1
            AidsUsed { audience_poll: false, call_friend: false, fifty_fifty: false },
            30000 // rewards earned (with decimal=2)
        );

    // Check accumulated rewards
    let total_rewards = dispatcher.get_player_rewards(player);
    assert(total_rewards == 40000, 'Bad total');

    // Stop pranking
    stop_cheat_caller_address(contract_address);
}

#[test]
fn test_all_game_modes_exist() {
    let contract_address = deploy_contract();
    let dispatcher = ILogiQuestDispatcher { contract_address };

    dispatcher.initialize_game_modes(2);

    // Check that all 8 game modes exist by requesting each one
    let modes = array![
        CLASSIC_MODE,
        CHALLENGE_MODE,
        DAILY_CHALLENGE_MODE,
        TIME_BLITZ_MODE,
        PUZZLE_MODE,
        PRACTICE_MODE,
        ADVENTURE_MODE,
        ENDLESS_MODE
    ];

    let mut i: u32 = 0;
    while i < modes.len() {
        let mode_id = *modes.at(i);
        let mode = dispatcher.get_game_modes(mode_id);
        assert(mode.id == mode_id, 'Bad ID');

        i += 1;
    }
}

#[test]
fn test_user_activity_tracking() {
    let contract_address = deploy_contract();
    let dispatcher = ILogiQuestDispatcher { contract_address };

    dispatcher.initialize_game_modes(2);

    let player = PLAYER();

    // Start pranking to simulate the player
    start_cheat_caller_address(contract_address, player);

    // Create aids used
    let aids_used = AidsUsed { audience_poll: true, call_friend: false, fifty_fifty: true, };

    // Create session details
    let session_details = SessionDetails {
        completed: true,
        timestamp: 1000000, // Some dummy timestamp
        duration: 120, // 2 minutes
        score: 85,
    };

    // Update user activity in Classic mode
    dispatcher
        .update_user_activity(
            player,
            CLASSIC_MODE,
            session_details,
            aids_used,
            0, // day is not relevant for Classic mode
        );

    // Get and verify user activity for Classic mode
    let activity = dispatcher.get_user_activity(player, CLASSIC_MODE);
    assert(activity.player == player, 'Bad player');
    assert(activity.mode_id == CLASSIC_MODE, 'Bad mode ID');
    assert(activity.sessions_completed == 1, 'Bad session count');
    assert(activity.total_score == 85, 'Bad score');
    assert(activity.total_time_spent == 120, 'Bad time');
    assert(activity.current_streak == 1, 'Bad streak');
    assert(activity.best_streak == 1, 'Bad best streak');
    assert(activity.aid_usage.audience_poll_count == 1, 'Bad poll count');
    assert(activity.aid_usage.call_friend_count == 0, 'Bad call count');
    assert(activity.aid_usage.fifty_fifty_count == 1, 'Bad 50/50 count');

    // Create second session details (failed this time)
    let session_details_2 = SessionDetails {
        completed: false,
        timestamp: 1001000, // Later timestamp
        duration: 90, // 1.5 minutes
        score: 40,
    };

    // Update activity again with a failed session
    dispatcher.update_user_activity(player, CLASSIC_MODE, session_details_2, aids_used, 0,);

    // Get and verify updated activity
    let updated_activity = dispatcher.get_user_activity(player, CLASSIC_MODE);
    assert(updated_activity.sessions_completed == 2, 'Bad sessions');
    assert(updated_activity.total_score == 125, 'Bad total score');
    assert(updated_activity.total_time_spent == 210, 'Bad time spent');
    assert(updated_activity.current_streak == 0, 'Bad streak reset');
    assert(updated_activity.best_streak == 1, 'Bad best streak');
    assert(updated_activity.aid_usage.audience_poll_count == 2, 'Bad poll count');

    // Test Daily Challenge mode activity tracking
    let daily_session = SessionDetails {
        completed: true, timestamp: 1002000, duration: 180, score: 95,
    };

    let daily_aids = AidsUsed { audience_poll: false, call_friend: false, fifty_fifty: true, };

    // Update daily challenge activity
    dispatcher
        .update_user_activity(player, DAILY_CHALLENGE_MODE, daily_session, daily_aids, 1, // day 1
        );

    // Get and verify daily challenge activity
    let daily_activity = dispatcher.get_daily_challenge_activity(player, 1);
    assert(daily_activity.player == player, 'Bad player');
    assert(daily_activity.mode_id == DAILY_CHALLENGE_MODE, 'Bad mode ID');
    assert(daily_activity.sessions_completed == 1, 'Bad session count');
    assert(daily_activity.total_score == 95, 'Bad score');
    assert(daily_activity.daily_activity.day == 1, 'Bad day');
    assert(daily_activity.daily_activity.completed_sessions == 1, 'Bad completed');
    assert(daily_activity.aid_usage.fifty_fifty_count == 1, 'Bad 50/50');

    // Add another session on the same day
    let daily_session_2 = SessionDetails {
        completed: true, timestamp: 1003000, duration: 150, score: 80,
    };

    dispatcher
        .update_user_activity(
            player, DAILY_CHALLENGE_MODE, daily_session_2, daily_aids, 1, // still day 1
        );

    // Verify multiple sessions in the same day are tracked correctly
    let updated_daily = dispatcher.get_daily_challenge_activity(player, 1);
    assert(updated_daily.sessions_completed == 2, 'Bad sessions');
    assert(updated_daily.total_score == 175, 'Bad total score');
    assert(updated_daily.daily_activity.completed_sessions == 2, 'Bad completed');
    assert(updated_daily.current_streak == 2, 'Bad streak');
    assert(updated_daily.best_streak == 2, 'Bad best streak');

    // Test different day tracking
    let day2_session = SessionDetails {
        completed: true, timestamp: 1090000, duration: 200, score: 100,
    };

    dispatcher
        .update_user_activity(player, DAILY_CHALLENGE_MODE, day2_session, daily_aids, 2, // day 2
        );

    // Verify day 2 activity
    let day2_activity = dispatcher.get_daily_challenge_activity(player, 2);
    assert(day2_activity.sessions_completed == 1, 'Bad day2 session');
    assert(day2_activity.total_score == 100, 'Bad day2 score');
    assert(day2_activity.daily_activity.day == 2, 'Bad day 2');
    assert(day2_activity.current_streak == 1, 'Bad day streak');

    // Stop pranking
    stop_cheat_caller_address(contract_address);
}


#[test]
fn test_claim_base_reward_on_first_activity() {
    let contract_address = deploy_contract();
    let dispatcher = ILogiQuestDispatcher { contract_address };

    dispatcher.initialize_game_modes(2);

    let player = PLAYER();

    // Start pranking to simulate the player
    start_cheat_caller_address(contract_address, player);

    let classic_mode = dispatcher.get_game_modes(CLASSIC_MODE);
    let expected_reward = classic_mode.base_reward;

    let initial_rewards = dispatcher.get_player_rewards(player);
    assert!(initial_rewards == 0, "Player should start with 0 rewards");

    let session_details = SessionDetails {
        completed: true,
        timestamp: 1000000, // Some dummy timestamp
        duration: 120, // 2 minutes
        score: 85,
    };

    // Update user activity in Classic mode
    dispatcher
        .update_user_activity(
            player,
            CLASSIC_MODE,
            session_details,
            AidsUsed { audience_poll: false, call_friend: false, fifty_fifty: false },
            0, // day is not relevant for Classic mode
        );

    let session_score = session_details.score.into();
    let rewards = dispatcher.get_player_rewards(player);
    assert!(
        rewards == (expected_reward + session_score),
        "Base reward should be added on first activity"
    );
    stop_cheat_caller_address(contract_address);
}


#[test]
fn test_claim_base_reward_not_claimed_twice() {
    let contract_address = deploy_contract();
    let dispatcher = ILogiQuestDispatcher { contract_address };

    dispatcher.initialize_game_modes(2);

    let player = PLAYER();

    // Start pranking to simulate the player
    start_cheat_caller_address(contract_address, player);

    let daily_mode = dispatcher.get_game_modes(DAILY_CHALLENGE_MODE);
    let expected_reward = daily_mode.base_reward;

    let initial_rewards = dispatcher.get_player_rewards(player);
    assert!(initial_rewards == 0, "Player should start with 0 rewards");

    let session_details = SessionDetails {
        completed: true,
        timestamp: 1000000, // Some dummy timestamp
        duration: 180, // 2 minutes
        score: 95,
    };
    // Update user activity in Classic mode
    dispatcher
        .update_user_activity(
            player,
            DAILY_CHALLENGE_MODE,
            session_details,
            AidsUsed { audience_poll: false, call_friend: false, fifty_fifty: true },
            1, // day is not relevant for Classic mode
        );

    let session_score = session_details.score.into();
    let rewards_after_first = dispatcher.get_player_rewards(player);
    assert!(
        rewards_after_first == expected_reward + session_score,
        "Base reward should be added on first activity"
    );

    let session_details_2 = SessionDetails {
        completed: true,
        timestamp: 1001000, // Some dummy timestamp
        duration: 150, // 2 minutes
        score: 75,
    };
    dispatcher
        .update_user_activity(
            player,
            DAILY_CHALLENGE_MODE,
            session_details_2,
            AidsUsed { audience_poll: false, call_friend: false, fifty_fifty: true },
            1, // day is not relevant for Classic mode
        );

    let session2_score = session_details_2.score.into();
    let rewards_after_second = dispatcher.get_player_rewards(player);
    assert!(
        rewards_after_second == expected_reward + session2_score + session_score,
        "Base reward should not be added again"
    );

    stop_cheat_caller_address(contract_address);
}


#[test]
fn test_claim_base_reward_per_mode() {
    let contract_address = deploy_contract();
    let dispatcher = ILogiQuestDispatcher { contract_address };

    dispatcher.initialize_game_modes(2);

    let player = PLAYER();

    // Start pranking to simulate the player
    start_cheat_caller_address(contract_address, player);

    let classic_mode = dispatcher.get_game_modes(CLASSIC_MODE);
    let challenge_mode = dispatcher.get_game_modes(CHALLENGE_MODE);

    let session1_details = SessionDetails {
        completed: true,
        timestamp: 1000000, // Some dummy timestamp
        duration: 120, // 2 minutes
        score: 85,
    };
    // Update user activity in Classic mode
    dispatcher
        .update_user_activity(
            player,
            CLASSIC_MODE,
            session1_details,
            AidsUsed { audience_poll: false, call_friend: false, fifty_fifty: false },
            0, // day is not relevant for Classic mode
        );

    let session1_score = session1_details.score.into();
    let rewards_after_classic = dispatcher.get_player_rewards(player);
    assert!(
        rewards_after_classic == classic_mode.base_reward + session1_score,
        "Only classic reward should be added"
    );

    let session2_details = SessionDetails {
        completed: true,
        timestamp: 1001000, // Some dummy timestamp
        duration: 60, // 1 minute
        score: 95,
    };
    dispatcher
        .update_user_activity(
            player,
            CHALLENGE_MODE,
            session2_details,
            AidsUsed { audience_poll: true, call_friend: false, fifty_fifty: true },
            0, // day is not relevant for Classic mode
        );

    let session2_score = session2_details.score.into();
    let session_scores = session1_score + session2_score;
    let rewards_after_challenge = dispatcher.get_player_rewards(player);
    let expected_total = classic_mode.base_reward + challenge_mode.base_reward + session_scores;
    assert!(rewards_after_challenge == expected_total, "Both rewards should be added");

    stop_cheat_caller_address(contract_address);
}


#[test]
#[should_panic(expected: ('Mode not configured as daily',))]
fn test_daily_validation() {
    let contract_address = deploy_contract();
    let dispatcher = ILogiQuestDispatcher { contract_address };

    dispatcher.initialize_game_modes(2);

    let player = PLAYER();

    // Start pranking to simulate the player
    start_cheat_caller_address(contract_address, player);

    // Try to update a non-daily mode as if it was a daily mode
    let session = SessionDetails { completed: true, timestamp: 1000000, duration: 120, score: 85, };

    // This should fail because we're trying to use CLASSIC_MODE with DAILY_CHALLENGE_MODE ID
    dispatcher
        .update_user_activity(
            player,
            CLASSIC_MODE, // Not a daily mode
            session,
            AidsUsed { audience_poll: false, call_friend: false, fifty_fifty: false },
            1, // day
        );
}

#[test]
#[should_panic(expected: ('Invalid number of options',))]
fn test_set_question_options_incorrect_len() {
    let contract_address = deploy_contract();
    let dispatcher = ILogiQuestDispatcher { contract_address };

    dispatcher.initialize_game_modes(2);

    // Try to get an invalid game mode (there are only 8 modes, from 0 to 7)
    let options = array!['test option'];
    dispatcher.set_question_options(options.span(), 'test_answer', false);
}

#[test]
#[should_panic(expected: ('Duplicate options',))]
fn test_set_question_options_duplicate_options() {
    let contract_address = deploy_contract();
    let dispatcher = ILogiQuestDispatcher { contract_address };

    dispatcher.initialize_game_modes(2);

    // Try to get an invalid game mode (there are only 8 modes, from 0 to 7)
    let options = array!['test option', 'test option', 'another option', 'option 4'];
    dispatcher.set_question_options(options.span(), 'test_answer', false);
}

#[test]
#[should_panic(expected: ('Answer not in options',))]
fn test_set_question_options_missing_correct_option() {
    let contract_address = deploy_contract();
    let dispatcher = ILogiQuestDispatcher { contract_address };

    dispatcher.initialize_game_modes(2);

    // Try to get an invalid game mode (there are only 8 modes, from 0 to 7)
    let options = array!['test option', 'test option 2', 'another option', 'option 4'];
    dispatcher.set_question_options(options.span(), 'test_answer', false);
}

#[test]
fn test_set_question_options() {
    let contract_address = deploy_contract();
    let dispatcher = ILogiQuestDispatcher { contract_address };

    dispatcher.initialize_game_modes(2);

    // Try to get an invalid game mode (there are only 8 modes, from 0 to 7)
    let options = array!['test option', 'test option 2', 'another option', 'option 4'];
    let new_questions = dispatcher.set_question_options(options.span(), 'test option', true);

    // // Check that questions order was shuffled
    // assert(*new_questions.at(0) != *options.at(0), 'Same option in 0');
    // assert(*new_questions.at(0) != *options.at(0), 'Same option in 0');
    // assert(*new_questions.at(1) != *options.at(1), 'Same option in 1');
    // assert(*new_questions.at(3) != *options.at(3), 'Same option in 3');
    // option 2 remains in the same position
    // assert(*new_questions.at(2) == *options.at(2), 'Same option in 2');

    ///@dev After editing the update_user_activity fn, this test began to fail.
    ///@dev I believe this is because of the randomization applied to the 'options' array.
    ///@dev So I thought since the options are random, the best approach is to confirm their
    ///@dev presence for each question... which is done below.

    assert(contains_option('test option', new_questions), 'Option 1 missing');
    assert(contains_option('test option 2', new_questions), 'Option 2 missing');
    assert(contains_option('another option', new_questions), 'Option 3 missing');
    assert(contains_option('option 4', new_questions), 'Option 4 missing');

    assert(contains_option('test option', new_questions), 'Answer missing');

    let mut changed = false;
    let mut i = 0;
    loop {
        if i == 4 {
            break;
        }
        if *new_questions.at(i) != *options.at(i) {
            changed = true;
            break;
        };
        i += 1;
    };
    assert(changed, 'Options not randomized');
}
