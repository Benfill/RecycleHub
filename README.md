# RecycleHub

RecycleHub is a recycling management application that connects individuals with authorized collectors. The goal is to automate recycling tasks efficiently using a Single Page Application (SPA) built with **Angular 17**, **TailwindCSS**, and **Reactive Forms**. The data is stored locally using Angular's LocalStorage.

![RecycleHub-04-25-2025_01_27_PM](https://github.com/user-attachments/assets/867de156-f37c-4cc5-9f40-069833214f1a)
![RecycleHub-04-25-2025_01_41_PM](https://github.com/user-attachments/assets/fe759864-d69c-4927-a28f-fbac46153a83)
![RecycleHub-04-25-2025_01_42_PM](https://github.com/user-attachments/assets/5ee95029-7375-4ad4-b0a9-2af36f689dc8)

## Features

### 1. **User Registration & Authentication**
- Users can sign up with their details:
  - Email & Password
  - Full Name
  - Address
  - Phone Number
  - Date of Birth
  - Profile Picture (optional)
- Basic authentication for all users (no admin role required).
- Only individuals can register; collectors are pre-registered manually.
- Users can update their profiles or delete their accounts.

### 2. **Waste Collection Requests**
- Users can request a waste collection specifying:
  - Waste Type (Plastic, Glass, Paper, Metal)
  - Waste Photos (optional)
  - Estimated Weight (minimum 1000g required)
  - Collection Address
  - Preferred Date & Time Slot (09:00 - 18:00)
  - Additional Notes (optional)
- Request statuses:
  - Pending (default)
  - Accepted
  - In Progress
  - Completed
  - Rejected
- Users can edit or cancel requests that are still pending.
- A user can have a maximum of **3 active requests** and a total limit of **10kg per collection**.

### 3. **Collector Process**
- Collectors see requests based on their city.
- They can accept, start, and complete a collection.
- The collection process includes:
  - Material verification
  - Weight confirmation
  - Optional photos
  - Final validation or rejection

### 4. **Points & Rewards System**
- Points are awarded per kg:
  - **Plastic**: 2 points
  - **Glass**: 1 point
  - **Paper**: 1 point
  - **Metal**: 5 points
- Points can be converted into vouchers:
  - **100 points** → **50 DH voucher**
  - **200 points** → **120 DH voucher**
  - **500 points** → **350 DH voucher**

## Tech Stack
- **Frontend**: Angular 17 (SPA)
- **Styling**: TailwindCSS
- **State Management**: NgRx
- **Forms**: Reactive Forms
- **Data Persistence**: LocalStorage
- **Other Concepts**: RxJS, Dependency Injection, Guards, Resolvers, Databinding, Routing

## Installation & Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/benfill/recyclehub.git
   cd recyclehub
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the development server:
   ```sh
   ng serve
   ```
4. Open the app in your browser:
   ```
   http://localhost:4200/
   ```

## Project Structure
```
recyclehub/
├── src/
│   ├── app/
│   │   ├── core/
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   │   ├── components/
│   │   │   │   ├── pages/
│   │   │   │   ├── service/
│   │   │   │   ├── auth.module.ts
│   │   │   ├── home/
│   │   │   ├── profile/
│   │   │   ├── features.module.ts
│   │   ├── shared/
│   │   ├── app-routing.module.ts
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.component.spec.ts
│   │   ├── app.component.ts
│   │   ├── app.module.ts
│   ├── assets/
│   ├── environnement/
│   │   ├── environment.ts
├── favicon.ico
├── index.html
```

## Contribution
Feel free to fork the repository and submit pull requests for improvements.

## License
This project is licensed under the MIT License.

---
Developed by **Anass Benfillous**.

