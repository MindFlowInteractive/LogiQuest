use super::random::RandomTrait;
use contract::random::RandomImpl;
use super::types::{Option, Question};

pub fn entry_is_duplicate(entry: felt252, options: Span<felt252>) -> bool {
    let mut i = 0;
    let mut found = false;
    let result = loop {
        if i == options.len() {
            break false;
        } else if *options.at(i) == entry && found {
            break true;
        } else if *options.at(i) == entry && !found {
            found = true;
        }
        i += 1;
    };

    result
}

pub fn contains_option<T, impl TPartialEq: PartialEq<T>, impl TDrop: Drop<T>, impl TCopy: Copy<T>>(
    entry: T, options: Span<T>
) -> bool {
    let mut i = 0;
    let result = loop {
        if i == options.len() {
            break false;
        } else if *options.at(i) == entry {
            break true;
        }
        i += 1;
    };
    result
}

pub fn generate_random_list(min: u8, max: u8, count: u8) -> Span<u8> {
    let mut i = 0;
    let mut result = array![];
    let mut random = RandomImpl::new();
    loop {
        if i == count {
            break;
        }
        let mut rand_i = random.between::<u8>(min, max);
        while contains_option(rand_i, result.span()) {
            rand_i = random.between::<u8>(min, max);
        };
        result.append(rand_i);
        i += 1;
    };

    result.span()
}

pub fn validate_question(question: Question) -> bool {
    if question.correct_option_index > 3 {
        return false;
    }

    let option_a_correct = question.option_a.is_correct;
    let option_b_correct = question.option_b.is_correct;
    let option_c_correct = question.option_c.is_correct;
    let option_d_correct = question.option_d.is_correct;

    // Check consistency between correct_option_index and is_correct flags
    match question.correct_option_index {
        0 => option_a_correct && !option_b_correct && !option_c_correct && !option_d_correct,
        1 => !option_a_correct && option_b_correct && !option_c_correct && !option_d_correct,
        2 => !option_a_correct && !option_b_correct && option_c_correct && !option_d_correct,
        3 => !option_a_correct && !option_b_correct && !option_c_correct && option_d_correct,
        _ => false, // This should never happen due to the range check above
    }
}

// Helper function to calculate question reward based on level
// (increments of 500 per level)
pub fn calculate_question_reward(level: u32) -> u256 {
    let reward_value: u128 = level.into() * 500_u128;
    u256 { low: reward_value, high: 0_u128 }
}
