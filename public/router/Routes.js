import { RaceComponent } from "../components/races-component";
import { RaceComponent2 } from "../components/races-component2";
import { HomeComponent } from "../components/home-component";


export const ROUTES =
    [
        { path: '', title: 'The Races of DnD', component: HomeComponent },
        { path: 'races', title: 'The Races of DnD', component: RaceComponent },
        { path: 'races2', title: 'The Races of DnD', component: RaceComponent2 },
    ];
