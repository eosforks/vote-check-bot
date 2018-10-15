const block_timestamp_epoch = 946684800;
const seconds_per_week = 24 * 3600 * 7;
const seconds_per_year = seconds_per_week * 52.000;

const stake2vote = (staked) => {
    const now = new Date().getTime() / 1000;
    const weight = (now - block_timestamp_epoch) / seconds_per_week / 52.0000;
    return staked * Math.pow(2, weight);
};

const calcTime = (vote_w, threshold, staked) => {
    const num_years = Math.log((vote_w * (1 + threshold / 100)) / staked) / Math.log(2);
    const time = (num_years * seconds_per_year) + block_timestamp_epoch;
    return new Date(time * 1000);
};

const validate_account = (account) => {
    return /^([a-z1-5]{12})$/.test(account);
};

const validate_threshold = (threshold) => {
    return (threshold >= 0 && threshold <= 100);
};

module.exports = {
    stake2vote,
    calcTime,
    validate_account,
    validate_threshold
};
