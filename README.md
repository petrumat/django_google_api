# Google Maps Web Application

## Credits

This project was started from [did_django_google_api_tutorial](https://github.com/bobby-didcoding/did_django_google_api_tutorial) from [Bobby Stearman](https://github.com/bobby-didcoding) and available at [Python Django and Google APIs - Project Tutorial](https://www.youtube.com/watch?v=_vCT42vDfgw&ab_channel=freeCodeCamp.org)

## Details

Django project that uses Google APIs to auto populate search input boxes, display maps, dynamic custom markers and info windows, monitoring live traffic data, users' events, generating alerts & reports.

## Virtual Environment and Running the code

Use following commands to get the project up and running:

1) cd to development directory
2) mkvirtualenv django_google_api
3) mkdir django_google_api
4) clone repository to new directory
5) pip install -r requirements.txt
6) create and update .env file based on .env-template format
7) python manage.py makemigrations
8) python manage.py migrate
9) python manage.py runserver
10) <https://localhost:8000> => home page

## Necessities

Don't forget to activate the following Google API's after you create a Google Account and activate a billing account:

- reCAPTURE
- Places API
- Maps Javascript API
- Directions API
- Distance Matrix API
- Geocoding API

As it turns out, the features provided by Google Maps APIs are not free and will have an approximate cost of $20 per month for an average of 1000 API requests (from each API, except reCAPTURE). Alternatives to [Google Maps](https://developers.google.com/maps) are: [Mapbox](https://www.mapbox.com/), [Apple Maps](https://developer.apple.com/maps/), [Microsoft Azure Maps](https://www.microsoft.com/en-us/maps), and others.

## Future Improvements

Some future improvements include:

- generate email with reset password link for accounts
- 2FA for accounts (working with Google Social Authentication)
- other social authentication: Facebook/Meta, Apple, Twitter, GitHub etc.
- adjust traffic lights (MANUAL/AUTO + time intervals) from user web page
- implement live chat functionalities

Have fun with the project (and read the LICENSE) !
