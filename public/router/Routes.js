import { RaceComponent } from "../components/races-component";
import { ClassesComponent } from "../components/classes-component";
import { HomeComponent } from "../components/home-component";
import { LoadingSpinner } from '../components/loading-spinner-component';


export const ROUTES =
    [
        { path: '', title: 'The Races of DnD', component: HomeComponent },
        { path: 'races', title: 'The Races of DnD', component: RaceComponent },
        { path: 'classes', title: 'The Classes of DnD', component: ClassesComponent },
    ];
