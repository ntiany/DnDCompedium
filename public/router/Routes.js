import { RaceComponent } from "../components/races-component";
import { ClassesComponent } from "../components/classes-component.ts";
import { HomeComponent } from "../components/home-component.ts";
import { LoadingSpinner } from '../components/loading-spinner-component';


export const ROUTES =
    [
        { path: 'home', title: 'Home of DnD', component: HomeComponent },
        { path: 'races', title: 'The Races of DnD', component: RaceComponent },
        { path: 'classes', title: 'The Classes of DnD', component: ClassesComponent },
        { path: '*', title: 'Home of DnD', component: HomeComponent },
    ];
