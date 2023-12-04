function setTraitScore(
  setTraitsScore,
  traitsScoreObj,
  question,
  selectedValue
) {
  setTraitsScore([...traitsScoreObj, { [question]: selectedValue }]);
}
