# Papagayo Bay Website

Welcome to the official repository for the Papagayo Bay Website! This document serves as the main hub for project information and our team's workflow guidelines.

---

## 🚀 How to Contribute

To keep our project stable and ensure code quality, we use a **branch and Pull Request workflow**. All changes, no matter how small, must go through this process. Please do not push directly to the `main` branch.

### Step-by-Step Workflow

**1. Sync Your `main` Branch**

Before starting any new work, make sure your local copy of the `main` branch is perfectly in sync with the remote repository. This prevents merge conflicts later.

    git switch main
    git pull origin main

**2. Create a New Feature Branch**

Create a new branch from `main` for the task you are about to work on. Use a descriptive, lowercase, hyphenated name.

* **Good:** `feat-user-login-form`, `fix-header-alignment-bug`
* **Bad:** `my-branch`, `testing`, `JohnsWork`

    # Example: git switch -c feat-add-contact-form
    git switch -c your-descriptive-branch-name

**3. Do Your Work & Commit Often**

Make your code changes on your new branch. Commit your work in small, logical chunks with clear and concise commit messages.

    # After making some changes...
    git add .
    git commit -m "feat: Add email and password input fields to login form"

**4. Push Your Branch to GitHub**

When your feature is complete and ready for review, push your branch to the remote repository on GitHub.

    git push origin your-descriptive-branch-name

**5. Open a Pull Request (PR)**

Go to your project's repository page on GitHub. You will see a green button to create a **Pull Request** from the branch you just pushed. Click it!

* **Title:** Give your PR a clear title that summarizes the change.
* **Description:** Briefly explain *what* you changed and *why*. If it fixes a specific issue, mention it.
* **Reviewers:** Assign at least one teammate to review your code.

**6. Review, Merge, and Clean Up**

Your assigned reviewer will look over the code. Once it's approved, the PR will be merged into the `main` branch. After a successful merge, it's good practice to delete your feature branch to keep the repository clean.
