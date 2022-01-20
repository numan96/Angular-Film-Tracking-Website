# Flixible

This Angular website was created with Angular 13, TypeScript, NgRx, Angular Material, SASS and Firebase.

API Used: `https://www.themoviedb.org/`

## Live Website

`https://ng-flixible.web.app/films`

## Test Login Details

Username: test@test.com 

Password: test123

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.3.

## Features List

**Authentication System** - Firebase Sign Up/Sign In. Logout in Navbar -> Logout.

**View Films (Homepage)** - View list of the latest films, different categories such as Most Popular, Now Playing and Top Rated. Films can be favourited or set as Watched here, or the films details page, by clicking the 'Heart' or 'List' icon corresponding to favourite/watched on the specific films card.

**Favourites List (User Icon in Navbar -> My Lists -> Favourites)** - List of an authenticated users favourite films. Users may remove the film as favourited here or go to the film details page for the specific film.

**Watched List (User Icon in Navbar -> My Lists -> Watched)** - List of an authenticated users watched films, which provides a date when the user selected it as watched (Films can be set as watched by clicking the 'List' icon on the right of the 'Heart' icon, either on the homepage or the films details page). Users may remove the film as watched here or go to the film details page for the specific film.

**Search Bar (in Navbar)** - Users can search any film in The Movie DB API, clicking the film in the search bar will take the user to the films Details page. 

**Film Details (Click Arrow icon inside Film card on Homepage)** - A page with all the information about the selected film such as the cast, trailers from YouTube, runtime and the Films rating. The user can set as favourite/watched or remove as favourite/watched here. If the user has set as watched or favourite, this will be shown (either with a white heart or a tick icon for watched, with the date this was selected as watched by the user).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
