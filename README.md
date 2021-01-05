# KuesaChat
A super-duper lightweight chat client for Twitch designed for streamers.
![](https://i.imgur.com/J0Ss0hB.png)
![](https://i.imgur.com/ONyKRKf.png)
## How It Works
KuesaChat directly loads the Twitch popout chat and modifies some styles to look better in desktop mode:
- Removes sub gift/bits header, hype train, predictions
- Removes channel points
- Moves chat button and settings next to chat bar
## Is It Safe?
Yes, and I absoultely encourage you to check the code to make sure. KuesaChat doesn't collect any Twitch credentials or keys, and everything goes directly through Twitch.
## Can I Contribute
Yes! I work full-time so I can't maintain this as aggressively as some might like, so feel free to fork and make PRs if that's your thing!
## Troubleshooting
1. **AHH THIS PROGRAM SUCKS WHY DOES IT TAKE SO LONG TO LOAD???**
   - This is because another instance of KuesaChat is running in the background (sometimes that happens when it fails to exit properly I think), try to find `kuesachat.exe` in your task manager and kill it, should load up nice and quickly after that.
