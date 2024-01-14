import { Constructor } from "../types/championship.types";

const TeamImageMap = {
  "red_bull": 'https://media.formula1.com/content/dam/fom-website/teams/2024/red-bull-racing-logo.png.transform/2col-retina/image.png',
  "mercedes": 'https://media.formula1.com/content/dam/fom-website/teams/2021/mercedes-logo.png.transform/2col-retina/image.png',
  "mclaren": 'https://media.formula1.com/content/dam/fom-website/teams/2021/mclaren-logo.png.transform/2col-retina/image.png',
  "aston_martin": 'https://media.formula1.com/content/dam/fom-website/teams/2021/aston-martin-logo.png.transform/2col-retina/image.png',
  "alpine": 'https://media.formula1.com/content/dam/fom-website/teams/2021/alpine-logo.png.transform/2col-retina/image.png',
  "ferrari": 'https://media.formula1.com/content/dam/fom-website/teams/2021/ferrari-logo.png.transform/2col-retina/image.png',
  "alphatauri": 'https://media.formula1.com/content/dam/fom-website/teams/2021/alphatauri-logo.png.transform/2col-retina/image.png',
  "alfa": 'https://media.formula1.com/content/dam/fom-website/teams/2021/alfa-romeo-racing-logo.png.transform/2col-retina/image.png',
  "williams": 'https://media.formula1.com/content/dam/fom-website/teams/2021/williams-logo.png.transform/2col-retina/image.png',
  "haas": 'https://media.formula1.com/content/dam/fom-website/teams/2024/haas-f1-team-logo.png.transform/2col-retina/image.png',
};

const getTeamImage = (team: Constructor) => {
  return TeamImageMap[team.constructorId as keyof typeof TeamImageMap];
}


export default getTeamImage;