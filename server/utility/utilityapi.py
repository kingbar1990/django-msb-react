import requests
UTILITY_API_TOKEN = 'fc30d8dbe2b6421ab16210e9e91bbafd'

# embed auth form
# https://utilityapi.com/docs/tutorials/embedding-auth-forms
# test scenarios
# https://utilityapi.com/docs/api/forms/test-submit#test-scenarios

# prod
# https://utilityapi.com/authorize/mysunbuddy
# https://mysunbuddy.com/utility_api_callback
# staging
# https://utilityapi.com/authorize/mysunbuddy_beta
# http://staging.mysunbuddy.com/utility_api_callback
# local dev
# https://utilityapi.com/authorize/mysunbuddy_local
# http://127.0.0.1:8000/utility_api_callback

# iframe
# local
# <iframe
#     src="https://utilityapi.com/authorize/mysunbuddy_local"
#     style="height: 800px; width: 800px;"></iframe>

# example test flow
# first create a form url
def create_form():
    url = 'https://utilityapi.com/api/v2/forms'
    r = requests.post(url, headers={'Authorization': 'Bearer '+ UTILITY_API_TOKEN})
    # for non iframe, use 'url' that's returned as utility API button url.  will redirect them to a form
    # test scenario just uses uid
    return r.json()

# in real flow, this will be a url parameter sent in at the redirect url after user submits form
def get_referral(form_uid):
    url = 'https://utilityapi.com/api/v2/forms/'+form_uid+'/test-submit'
    r = requests.post(
        url,
        json = {"utility": "DEMO", "scenario": "residential"},
        headers={'Authorization': 'Bearer '+ UTILITY_API_TOKEN},
    )
    # referral id in key 'referral'
    return r.json()

# download and save all of this info, e.g. csvs, other metadata
def get_meters(referral_id):
    url = 'https://utilityapi.com/api/v2/authorizations?referrals='+referral_id+'&include=meters'
    r = requests.get(
        url,
        headers={'Authorization': 'Bearer '+ UTILITY_API_TOKEN},
    )
    # r.json()['authorizations'][0]['meters']['meters'][0]['uid'] gives meter uid
    return r.json()

# note: this costs money for real meters
def activate_meters(meter_uid):
    url = 'https://utilityapi.com/api/v2/meters/historical-collection'
    r = requests.post(
        url,
        json = {
            'meters':[meter_uid]
        },
        headers={'Authorization': 'Bearer '+ UTILITY_API_TOKEN},
    )
    # should return key 'success':True
    # when this does, we should change status from inactive to active
    return r.json()

# poll this function on a schedule until both bill_count and status are >0 and == 'updated', respectively
def check_meter_status(meter_uid):
    url = 'https://utilityapi.com/api/v2/meters/' + meter_uid
    r = requests.get(
        url,
        headers={'Authorization': 'Bearer ' + UTILITY_API_TOKEN}
    )
    # r.json()['bill_count'] >=0
    # r.json()['status'] either 'pending' or 'updated'
    return r.json()

# download all bills & save info
def download_bills(meter_uid):
    url = 'https://utilityapi.com/api/v2/bills?meters=' + meter_uid
    r = requests.get(
        url,
        headers={'Authorization': 'Bearer ' + UTILITY_API_TOKEN}
    )
    return r.json()

# needs to handle errors gracefully, e.g. return well to the dashboard & display a helpful error message
# https://utilityapi.com/docs/api/forms/test-submit#test-scenarios
def run_test_pipeline():
    # in real flow will be iframe
    form_dict = create_form()
    # in real flow get this as url param via redirect url
    referral_dict = get_referral(form_dict['uid'])

    meters_dict = get_meters(referral_dict['referral'])
    meter_uid = meters_dict['authorizations'][0]['meters']['meters'][0]['uid']
    # costs $
    activate_dict = activate_meters(meter_uid)
    # check until status == updated & bill count > 0
    # this should occur in the background, while this is not complete just display a diff message on dashboard
    status_dict = check_meter_status(meter_uid)
    bills_dict = download_bills(meter_uid)
    return bills_dict