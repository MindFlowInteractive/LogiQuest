use super::super::types::{Option, Question};
use super::super::utils::{validate_question, calculate_question_reward};

#[test]
fn test_question_creation() {
    // Create options for the question
    let option_a = Option { label: 'A', text: 'First option', is_correct: true };
    let option_b = Option { label: 'B', text: 'Second option', is_correct: false };
    let option_c = Option { label: 'C', text: 'Third option', is_correct: false };
    let option_d = Option { label: 'D', text: 'Fourth option', is_correct: false };

    // Create a question with level 1 (reward should be 500)
    let question = Question {
        level: 1,
        reward: calculate_question_reward(1),
        question_text: 'This is a test question',
        option_a: option_a,
        option_b: option_b,
        option_c: option_c,
        option_d: option_d,
        correct_option_index: 0,
    };

    assert(validate_question(question) == true, 'Question should be valid');

    assert(question.reward.low == 500_u128, 'Reward should be 500');
    assert(question.reward.high == 0_u128, 'High bits should be 0');
}

#[test]
fn test_question_validation_correct_option() {
    // Test with option B as correct
    let option_a = Option { label: 'A', text: 'Option A', is_correct: false };
    let option_b = Option { label: 'B', text: 'Option B', is_correct: true };
    let option_c = Option { label: 'C', text: 'Option C', is_correct: false };
    let option_d = Option { label: 'D', text: 'Option D', is_correct: false };

    let question = Question {
        level: 2,
        reward: calculate_question_reward(2),
        question_text: 'Test question 2',
        option_a: option_a,
        option_b: option_b,
        option_c: option_c,
        option_d: option_d,
        correct_option_index: 1,
    };

    assert(validate_question(question) == true, 'Question should be valid');

    // Reward for level 2 should be 1000
    assert(question.reward.low == 1000_u128, 'Reward should be 1000');
}

#[test]
fn test_invalid_question_multiple_correct() {
    let option_a = Option { label: 'A', text: 'Option A', is_correct: true };
    let option_b = Option { label: 'B', text: 'Option B', is_correct: true };
    let option_c = Option { label: 'C', text: 'Option C', is_correct: false };
    let option_d = Option { label: 'D', text: 'Option D', is_correct: false };

    let question = Question {
        level: 3,
        reward: calculate_question_reward(3),
        question_text: 'Invalid question',
        option_a: option_a,
        option_b: option_b,
        option_c: option_c,
        option_d: option_d,
        correct_option_index: 0,
    };

    assert(validate_question(question) == false, 'Multiple correct should fail');
}

#[test]
fn test_invalid_question_index_mismatch() {
    // Create a question where the correct_option_index doesn't match the is_correct flags
    let option_a = Option { label: 'A', text: 'Option A', is_correct: true };
    let option_b = Option { label: 'B', text: 'Option B', is_correct: false };
    let option_c = Option { label: 'C', text: 'Option C', is_correct: false };
    let option_d = Option { label: 'D', text: 'Option D', is_correct: false };

    let question = Question {
        level: 4,
        reward: calculate_question_reward(4),
        question_text: 'Index mismatch question',
        option_a: option_a,
        option_b: option_b,
        option_c: option_c,
        option_d: option_d,
        correct_option_index: 1,
    };

    assert(validate_question(question) == false, 'Index mismatch should fail');
}

#[test]
fn test_invalid_question_out_of_range_index() {
    // Create a question with an out-of-range correct_option_index
    let option_a = Option { label: 'A', text: 'Option A', is_correct: false };
    let option_b = Option { label: 'B', text: 'Option B', is_correct: false };
    let option_c = Option { label: 'C', text: 'Option C', is_correct: false };
    let option_d = Option { label: 'D', text: 'Option D', is_correct: false };

    let question = Question {
        level: 5,
        reward: calculate_question_reward(5),
        question_text: 'Out of range index',
        option_a: option_a,
        option_b: option_b,
        option_c: option_c,
        option_d: option_d,
        correct_option_index: 4,
    };

    assert(validate_question(question) == false, 'Out of range should fail');
}

#[test]
fn test_reward_calculations() {
    // Test reward calculations for different levels
    let reward_level_1 = calculate_question_reward(1);
    let reward_level_5 = calculate_question_reward(5);
    let reward_level_10 = calculate_question_reward(10);

    assert(reward_level_1.low == 500_u128, 'Level 1 reward should be 500');
    assert(reward_level_5.low == 2500_u128, 'Level 5 reward should be 2500');
    assert(reward_level_10.low == 5000_u128, 'Level 10 reward should be 5000');
}
