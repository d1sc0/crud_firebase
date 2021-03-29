A bit of an experiment using plain old javascript and multiple html files to explore firebase - plan to use firestore, authentication, storage an cloud functions. No react frameworks of fancy single page apps.

SO far the app allows an authenticated user to upload photos, delete them and send a link to a specific photo page via SMS

note: I've excluded the raw bulm files from this repo.

# Send Pic Prototype

## Done

1. Implement some simple theming - done
2. Login form and script - done
3. Logout button - done
4. Create a view to hold the data - done
5. Put some dummy data in firestore - done
6. Hook data up to view and iterate through - done
7. Setup appropriate authentication rules on DB - done
8. Add a form to submit records to DB - done
9. Update form for registered users to add photos into file storage and update the DB - done
10. Be able to delete a picture - from DB and storage - done

## Next

11. Create a page that shows a single picture and send it
12. Use a cloud function to send a link to a Send Pic

## Later

1. Improve logon form validation and error messages!
2. Improve image upload validation. filesize and dimenions
3. Play with image manipulation on upload - extension in firebase
4. Register users, profile form and roles?
