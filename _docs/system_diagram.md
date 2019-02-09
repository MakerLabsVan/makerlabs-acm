System Diagram {#system_diagram}
=========================================

@htmlonly
<div class="mermaid">
  graph TB
    subgraph Google Cloud
      subgraph Google Auth
        OAuthTokenEndpoint["OAuth Token Endpoint"]
      end
      subgraph Google APIs
        GoogleSheets["Google Sheets API"]
        GoogleViz["Google Visualization API"]
        GoogleDrive["Google Drive API"]
      end
      subgraph Firebase
        subgraph Firebase Hosting
          subgraph webcomponents/
            ViewUserPage["view-user-page"]
            WebComponents["Polymer Packaged Bundle"]

            click ViewUserPage "view-user-page_8html.html" "webcomponents/view-user-page.html"
            click WebComponents "group__webcomponents.html" "webcomponents/"
          end
        end
        subgraph Firebase Database
          latestUser["readers/{machineId}/latestUser"]
        end
        subgraph Firebase Functions
          subgraph functions/
            google_apps_script_proxy["/google_apps_script_proxy"]

            click google_apps_script_proxy "google__apps__script__proxy__http_8dart.html" "functions/lib/google_apps_script_proxy_http.dart"
          end
        end
      end
      subgraph Google Apps Script
        subgraph scripts/
          Users["'Users' Sheet"]
          Activity["'Activity, De-duped' Sheet"]
          doGet["doGet()"]
          users_fields["users-fields"]
          next_makerlabs_id["next-makerlabs-id"]
          dailyEmailTrigger["5pm ~ 6pm Daily Trigger"]
          weeklyEmailTrigger["Friday Afternoon Weekly Trigger"]
          UsageEmail["Machine Usage Email"]
          BillingEmail["Monthly Billing Email"]

          click doGet "scripts_2views_2index_8js.html" "scripts/views/index.js"
          click users_fields "view_users_fields_8js.html" "scripts/views/viewUsersFields.js"
          click next_makerlabs_id "view_next_maker_labs_id_8js.html" "scripts/views/viewNextMakerLabsId.js"
          click dailyEmailTrigger "triggers_for_activity_sheet_8js.html" "scripts/triggers/triggersForActivitySheet.js"
          click weeklyEmailTrigger "triggers_for_activity_sheet_8js.html" "scripts/triggers/triggersForActivitySheet.js"
          click UsageEmail "triggers_for_activity_sheet_8js.html" "scripts/triggers/triggersForActivitySheet.js"
          click BillingEmail "triggers_for_activity_sheet_8js.html" "scripts/triggers/triggersForActivitySheet.js"
        end
      end
    end
    subgraph AWS
      AWS_API_Gateway["API Gateway"]

      click AWS_API_Gateway "serverless_8yml.html" "functions/serverless.yml"
      subgraph Lambda
        subgraph functions/
          permissions_check["/permissions_check"]

          click permissions_check "permissions__check__http_8dart.html" "functions/lib/permissions_check_http.dart"
        end
      end
    end
    subgraph MakerLabs
      Browser["CM Web Browser(s)"]
      subgraph electrical/
        subgraph firmware/
          Reader["Reader(s)"]

          click Reader "group__firmware.html" "firmware/"
        end
      end
    end
    users_fields-->Users
    next_makerlabs_id-->Users
    dailyEmailTrigger-->UsageEmail
    weeklyEmailTrigger-->BillingEmail
    UsageEmail-->Activity
    UsageEmail-->Users
    BillingEmail-->Activity
    AWS_API_Gateway-->permissions_check
    ViewUserPage-->WebComponents
    google_apps_script_proxy-->doGet
    doGet-->users_fields
    doGet-->next_makerlabs_id
    ViewUserPage-->GoogleDrive
    ViewUserPage-->GoogleSheets
    ViewUserPage-->GoogleViz
    ViewUserPage-->google_apps_script_proxy
    ViewUserPage-->latestUser
    OAuthTokenEndpoint-->|OAuth Access Token|Reader
    Reader-->|OAuth Refresh Token|OAuthTokenEndpoint
    Browser-->|OAuth Refresh Token|OAuthTokenEndpoint
    OAuthTokenEndpoint-->|OAuth Access Token|Browser
    Reader-->|ACM.Activity flatbuffer<br/>OAuth Access Token|AWS_API_Gateway
    AWS_API_Gateway-->|ACM.User flatbuffer|Reader
    Browser-->ViewUserPage
    Reader-->GoogleDrive
    permissions_check-->GoogleSheets
    permissions_check-->GoogleViz
    %%permissions_check-->latestUser
    latestUser---permissions_check
</div>
@endhtmlonly
