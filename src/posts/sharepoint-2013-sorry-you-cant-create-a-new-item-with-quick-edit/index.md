---
title: "SharePoint 2013 Sorry, you can't create a new item with Quick Edit because this view is missing one or more required columns."
desc: "SharePoint 2013 Sorry, you can't create a new item with Quick Edit because this view is missing one or more required columns. To create a new item, please click \"New Item\" or add required columns to this view."
published: 2014-04-03
date: 2014-04-03
tags: [sharepoint, sharepoint2013]
socialCardUrl: "/posts/sharepoint-2013-sorry-you-cant-create-a-new-item-with-quick-edit/og-image/"
---
I have this really annoying issue with SharePoint 2013 and searching the web hasn't come up with an answer yet.

I'm unable to create new items in a custom list. I get the following error message:

{% screenshot "./src/posts/sharepoint-2013-sorry-you-cant-create-a-new-item-with-quick-edit/images/spissue1.png", "screenshot of error message" %}

_Sorry, you can't create a new item with Quick Edit because this view is missing one or more required columns. To create a new item, please click "New Item" or add required columns to this view._

If I modify the view and add **Name (for use in forms)** to the view, I'm then able to add a value to the column and SharePoint allows me to create a new record. It doesn't seem to matter what I enter into the Name field when adding the record as it replaces my value automatically.

{% screenshot "./src/posts/sharepoint-2013-sorry-you-cant-create-a-new-item-with-quick-edit/images/spissue2.png", "screenshot of error message" %}

I checked the Columns setting for the list and there's no Name column listed for me to remove the Required setting from!

{% screenshot "./src/posts/sharepoint-2013-sorry-you-cant-create-a-new-item-with-quick-edit/images/spissue3.png", "screenshot of error message" %}

Uhm, so what gives? Why can't I add new records to a custom list using Quick Edit mode? It works fine if I click the New button and use the form.

This is a new custom list on SharePoint 2013 SP1.
