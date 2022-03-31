
export const randomBetween = (min: number, max: number): number => {
  return min + Math.random() * (min - max);
};

export const randomInt = (min: number, max: number): number => {
  return min + Math.floor(Math.random() * (max - min + 1));
};

export const randomElement = <T>(elements: T[]): T => {
  return elements[Math.floor(Math.random() * elements.length)];
};

export type Color = { r: number, g: number, b: number };
export const rgb = (r: number, g: number, b: number): Color => ({ r, g, b });
export const randomColor = () => {
  const color = randomElement(randomElement(palettes));
  return rgb(
    parseInt(color.substring(1, 3), 16) / 255,
    parseInt(color.substring(3, 5), 16) / 255,
    parseInt(color.substring(5, 7), 16) / 255
  );
};

export const palettes = [
  ["#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51"],
  ["#e63946", "#f1faee", "#a8dadc", "#457b9d", "#1d3557"],
  ["#006d77", "#83c5be", "#edf6f9", "#ffddd2", "#e29578"],
  ["#ef476f", "#ffd166", "#06d6a0", "#118ab2", "#073b4c"],
  ["#f72585", "#7209b7", "#3a0ca3", "#4361ee", "#4cc9f0"],
  ["#dec9e9", "#dac3e8", "#d2b7e5", "#c19ee0", "#b185db"],
  ["#a06cd5", "#9163cb", "#815ac0", "#7251b5", "#6247aa"],
  ["#f79256", "#fbd1a2", "#7dcfb6", "#00b2ca", "#1d4e89"],
  ["#1a535c", "#4ecdc4", "#f7fff7", "#ff6b6b", "#ffe66d"],
  ["#eddcd2", "#fff1e6", "#fde2e4", "#fad2e1", "#c5dedd"],
  ["#dbe7e4", "#f0efeb", "#d6e2e9", "#bcd4e6", "#99c1de"],
  ["#27187e", "#758bfd", "#aeb8fe", "#f1f2f6", "#ff8600"],
  ["#ffbc42", "#d81159", "#8f2d56", "#218380", "#73d2de"],
  ["#f8ffe5", "#06d6a0", "#1b9aaa", "#ef476f", "#ffc43d"],
  ["#ddfff7", "#93e1d8", "#ffa69e", "#aa4465", "#861657"],
  ["#826aed", "#c879ff", "#ffb7ff", "#3bf4fb", "#caff8a"],
  ["#ff00ea", "#b300e8", "#880dff", "#3500e8", "#000bff"],
  ["#034732", "#008148", "#c6c013", "#ef8a17", "#ef2917"],
  ["#000000", "#e4d6a7", "#e9b44c", "#9b2915", "#50a2a7"],
  ["#114b5f", "#028090", "#e4fde1", "#456990", "#f45b69"],
  ["#ffffff", "#84dcc6", "#a5ffd6", "#ffa69e", "#ff686b"],
  ["#602437", "#ff8700", "#ffd300", "#deff0a", "#a1ff0a"],
  ["##0aff99", "#0aefff", "#147df5", "#580aff", "#be0aff"],
  ["#90f1ef", "#ffd6e0", "#ffef9f", "#c1fba4", "#7bf1a8"],
  ["#5465ff", "#788bff", "#9bb1ff", "#bfd7ff", "#e2fdff"],
  ["#ffc2d4", "#ff9ebb", "#ff7aa2", "#e05780", "#b9375e", "#8a2846", "#602437"],
  ["#fffae5", "#fff6cc", "#fff2b2", "#ffee99", "#ffe97f"],
  ["#ffe566", "#ffe14c", "#ffdd32", "#ffd819", "#ffd400"],
  ["#faa916", "#fbfffe", "#6d676e", "#96031a", "#deff0a"],
  ["#d88c9a", "#f2d0a9", "#f1e3d3", "#99c1b9", "#8e7dbe"],
  ["#d9f4c7", "#f8fa90", "#f4ef88", "#ac9969", "#9dcdc0"],
  ["#be0e57", "#3626a7", "#657ed4", "#ff331f", "#fbfbff"],
  ["#1c77c3", "#39a9db", "#40bcd8", "#f39237", "#d63230"],
  ["#00568f", "#a30000", "#ff7700", "#efd28d", "#00afb5"],
  ["#247ba0", "#70c1b3", "#b2dbbf", "#f3ffbd", "#ff1654"],
  ["#8ab1d0", "#4c6a94", "#e6aace", "#f0f4ef", "#91a550"],
  ["#0e7c7b", "#17bebb", "#d4f4dd", "#d62246", "#933979"],
  ["#6aa0a0", "#ffffff", "#ffd5c2", "#f28f3b", "#c8553d"],
  ["#8b8bd0", "#764ad3", "#402bca", "#7180b9", "#c4e9ce"],
  ["#24a810", "#abff4f", "#08bdbd", "#f21b3f", "#ff9914"],
  ["#6f1d1b", "#bb9457", "#f5f5f5", "#99582a", "#ffe6a7"],
  ["#fe4a49", "#2ab7ca", "#fed766", "#858599", "#f4f4f8"],
  ["#de6b48", "#e5b181", "#f4b9b2", "#daedbd", "#7dbbc3"],
  ["#eef4d4", "#daefb3", "#ea9e8d", "#d64550", "#649089"],
  ["#f7b267", "#f79d65", "#f4845f", "#f27059", "#f25c54"],
  ["#086788", "#07a0c3", "#f0c808", "#fff1d0", "#dd1c1a"],
  ["#b5ffe1", "#93e5ab", "#65b891", "#4e878c", "#00A37A"],
  ["#c1c1c1", "#2c4251", "#d16666", "#b6c649", "#ffffff"],
];