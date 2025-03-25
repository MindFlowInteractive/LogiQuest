use super::random::RandomTrait;
use contract::random::RandomImpl;

pub fn entry_is_duplicate(entry: felt252, options: Span<felt252>) -> bool {
    let mut i = 0;
    let mut found = false;
    let result = loop {
        if i == options.len() {
            break false;
        }
        else if *options.at(i) == entry && found {
            break true;
        }
        else if *options.at(i) == entry && !found {
            found = true;
        }
        i += 1;
    };

    result
}

pub fn contains_option<
    T,
    impl TPartialEq: PartialEq<T>,
    impl TDrop: Drop<T>,
    impl TCopy: Copy<T>
>(entry: T, options: Span<T>) -> bool {
    let mut i = 0;
    let result = loop {
        if i == options.len() {
            break false;
        }
        else if *options.at(i) == entry {
            break true;
        }
        i += 1;
    };
    result
}

pub fn generate_random_list(
    min: u8,
    max: u8,
    count: u8
) -> Span<u8> {
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
