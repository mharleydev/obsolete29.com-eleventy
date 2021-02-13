---
title: Getting started with home automation and my initial thoughts
desc: "I have been interested in home automation for a long time and have finally decided to dip my toe in. Here are some quick notes about my thoughts so far."
published: 2021-02-06T17:02:25.831Z
date: 2021-02-06T17:02:25.831Z
tags:
  - home-automation
  - homekit
socialCardUrl: /posts/initial-thoughts-on-home-automation/og-image/og-social-cover.jpg
generateOpenGraphImage: false
---
I've been interested in home automation for a long time and have finally decided to dip my toe in. Here are some quick notes about my thoughts so far.

## My hardware

I’ve purchased a few Philip Hue bulbs, some switches and a couple eufy cams to see what it’s all about.

- [eufy Indoor Cam 2k](https://us.eufylife.com/products/t8400)
- [Hue White Starter kit E26](https://www.philips-hue.com/en-us/p/hue-white-starter-kit-e26/046677476922)
- [Hue Motion Sensor](https://www.philips-hue.com/en-us/p/hue-motion-sensor/046677473389)
- [Hue Dimmer switch](https://www.philips-hue.com/en-us/p/hue-dimmer-switch/046677473372)
- [Hue Smart button](https://www.philips-hue.com/en-us/p/hue-smart-button/046677553715)
- And I have some Hue bulbs, both color and just the dimmable white lights.
- [NFC tags](https://www.amazon.com/gp/product/B08GK6SPLS/ref=ppx_yo_dt_b_asin_title_o00_s00?ie=UTF8&psc=1)
- [ecobee SmartThermostat](https://www.ecobee.com/en-us/smart-thermostats/smart-wifi-thermostat-with-voice-control/) (My system is too old and can't be hooked up, even with the included kit. The HVAC people said my system was just too old. We're moving in the spring though so I'm going to hold onto it for our next place)

Setup was straight forward. I hooked up the bridge and then everything has connected seamlessly with the system.

## HomeKit

As an Apple fanboy, HomeKit integration was pretty important to me. I didn't really know what to expect in regards to how it works but I've noticed that I don't have all of the same functionality in HomeKit as I do in the manufacturers native apps. For instance, the Hue smart button can be configured with many more options than in HomeKit.

<figure>
    {% image "./src/posts/initial-thoughts-on-home-automation/images/hue-example.jpeg", "Screenshot of Hue app configuration for a smart button." %}
    <figcaption>Lots of options to configure the pressing of a single button.</figcaption>
</figure>

<figure>
    {% image "./src/posts/initial-thoughts-on-home-automation/images/homekit-example.jpeg", "Screenshot of HomeKit app configuration for a smart button." %}
    <figcaption>With HomeKit, not so much."</figcaption>
</figure>

It's kind of a bummer and I'm not sure who's fault it is. Is Hue not exposing all the functionality to HomeKit? Or is HomeKit just not supporting the additional functionality? I think it's probably Hue because they want you to be bought into *their* walled garden.

## My automations

I've just begun to scratch the surface on what's possible with home automations but here are a few that I use.

- When motion is detected in the living room between 4am and 6:15am: It's super rare that we'll not be downstairs before 6am. This automation uses the eufy cam in the living room to detect motion and to turn on some downstairs lights and turn on NPR for the morning news.
- Sunrise, Daily: Turn off the back patio light.
- 8am, Weekdays: Rachelle and I have both usually transferred upstairs to begin our work day by 8am so I turn off the downstairs lights and the audio if they're on.
- Sunset, Daily: Turn the bed side lights on 33%

## Conclusions so far

I'm looking forward to trying to figure out more automations with the NFC tags as I think there's lots of potential with them.

Overall though, I’m a bit underwhelmed. It's cool to be able to use Siri to turn lights on and off. It's neat to be able to schedule the lights to do this or that. I can use the indoor cams as motion sensors to control lights. The amount invested for something that's "neat" just doesn't seem worth it to me.

I get the same feeling from this as I do about the Apple Watch. It's cool and neat and I feel like there should be a killer use case but I just can't see it.

Nevertheless, I plan to continue my experiment and will report back my findings! Thanks for reading!
