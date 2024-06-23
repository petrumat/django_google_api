import os, sys, django

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'tutorial.settings')

django.setup()


from users_tutorial.models import TrafficInfo, TrafficLight, GenerateAlert, GenerateReport
import users_tutorial.utils as utils


def main():
    # add_traffic_info_marker()
    add_traffic_light_marker()
    # add_generate_alert_marker()
    # add_generate_report_marker()


def add_traffic_info_marker():
    lat = 44.3897315582826
    lng = 26.233756329588047
    zone = "Glina"
    density = 150
    med_speed = 45
    lights = False
    cameras = False
    signs = False
    incidents = False
    accidents = False
    alerts = utils.update_traffic_info_alert(lights, cameras, signs, incidents, accidents)
    alert_content = utils.update_traffic_info_alert_content(lights, cameras, signs, incidents, accidents)
    ariaLabel = zone + " Traffic Data"
    icon = utils.update_traffic_info_icon(accidents, alerts)
    title = ariaLabel

    marker = TrafficInfo(lat=lat, lng=lng, zone=zone, density=density, med_speed=med_speed, lights=lights, cameras=cameras, signs=signs, incidents=incidents, accidents=accidents, alerts=alerts, alert_content=alert_content, ariaLabel=ariaLabel, icon=icon, title=title)

    marker.save()

    print(f"Added traffic marker")


def add_traffic_light_marker():
    return


def add_generate_alert_marker():
    return


def add_generate_report_marker():
    return


if __name__ == "__main__":
    main()