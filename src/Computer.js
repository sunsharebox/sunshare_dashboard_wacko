/**
 * @class contains business logics.
 */

class Computer {
  /**
   * Returns the percentage of energy consumed.
   * @param {number} produced The total number of energy produced.
   * @param {number} consumed The total number of energy consumed.
   */
  computePercentageConsumed = (consumed, produced) => {
    return Math.ceil((consumed / produced) * 100);
  };

  /**
   * Return a random tip. 
   */
  computeRandomTip = tips => {
    return tips[Math.floor(tips.length * Math.random())];
  };
}
export default new Computer();
