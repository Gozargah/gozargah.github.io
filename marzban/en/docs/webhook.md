---
title: Marzban Webhook 
---

# Webhook 

- If you’re using Marzban and need a way to handle user events automatically, webhooks provide a flexible solution. It allows you to receive notifications about various events, such as user creation, updates, or expiration, which can be used for integration with external systems.

- **Event Tracking**: Get notifications on user events like creation, updates, restrictions, and more.

- **Integration with External Systems**: Automate actions like updating a database, sending alerts, or performing other processes in response to events in Marzban.

::: tip Tip
If you are a regular user, you won’t need this section.
:::

## **Step 1: Configuring the Webhook URL**

- Define the `URL` where you want to receive notifications in the `env` file or through environment variables.
```env
WEBHOOK_ADDRESS = "http://127.0.0.1:9000/,http://127.0.0.1:9001/"
```

- To add a secret key for request verification, set `WEBHOOK_SECRET`.
```env
WEBHOOK_SECRET = "something-very-very-secret"
```

- Now, Marzban will send POST requests to this URL when a specific user event occurs.

- Using the following variable, the notification queue is checked every `30` seconds and then sent to the webhook.
```env
JOB_SEND_NOTIFICATIONS_INTERVAL = 30
```
- Using the variable below, you can specify the Discord `URL` for the webhook.
```env
DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/xxxxxxx"
```

## **Step 2: Processing Incoming Notifications**

- Your server receiving webhooks needs to handle POST requests with `JSON` content. Every request includes a `x-webhook-secret` header (if configured) for security, as well as event-specific details in the `payload`. Here’s a sample `JSON payload`:

```
{
  "username": "example_user",
  "action": "user_created",
  "enqueued_at": 1680506457.636369,
  "tries": 0
}
```

- `username`: Username related to the event.
- `action`: Type of event (e.g., `user_created`, `user_updated`).
- `enqueued_at`: Timestamp of the event.
- `tries`: Retry count if notification delivery fails.

**Event Types:**

- The `action` field may have the following values:
- `user_created`: Triggered when a user is created.
- `user_updated`: When a user’s details are updated.
- `user_deleted`: When a user is deleted.
- `user_limited`: When the user’s data limit is reached.
- `user_expired`: When a user’s account expires.
- `user_disabled` / `user_enabled`: When a user is disabled or enabled.

## **Step 3: Example Code for Receiving a Webhook**

- Here’s an example using `Python` and `Flask` to set up a server that verifies Marzban webhook notifications.

::: details code example
::: code-group
```code
from flask import Flask, request, jsonify
import hmac
import hashlib

app = Flask(__name__)
WEBHOOK_SECRET = 'your-secret-key'

def verify_signature(data, signature):
    expected_signature = hmac.new(WEBHOOK_SECRET.encode(), data, hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected_signature, signature)

@app.route('/webhook', methods=['POST'])
def webhook():
    signature = request.headers.get('x-webhook-secret')
    if not signature or not verify_signature(request.data, signature):
        return jsonify({"error": "Invalid signature"}), 403

    payload = request.json
    print("Received event:", payload['action'], "for user:", payload['username'])
    
    # Process the event
    if payload['action'] == 'user_created':
        # Code to handle user creation
        pass
    elif payload['action'] == 'user_updated':
        # Code to handle user update
        pass
    # Additional event actions

    return jsonify({"status": "success"}), 200

if __name__ == '__main__':
    app.run(port=5000)
```
:::

## Example request sent from Marzban:

::: details request example
::: code-group
```code
Headers:
Host: 0.0.0.0:9000
User-Agent: python-requests/2.28.1
Accept-Encoding: gzip, deflate
Accept: */*
Connection: keep-alive
x-webhook-secret: something-very-very-secret
Content-Length: 107
Content-Type: application/json



Body:
{"username": "marzban_test_user", "action": "user_updated", "enqueued_at": 1680506457.636369, "tries": 0}
```
:::
