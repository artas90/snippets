#include <iostream>
using namespace std;

int userPoints[2] = {0, 0};

void printPoints() {
  cout << "Current points:" << endl
       << "  User1: " << userPoints[0] << endl
       << "  User2: " << userPoints[1] << endl
       << endl;
}

int cube1 = 0;
int cube2 = 0;

int getRandomSeed() {
  return rand() % 6 + 1;
}

int curentUser = 0;

void switchUser() {
  curentUser = curentUser == 0 ? 1 : 0;
}

int main() {
  srand(time(0));

  printPoints();

  while (true) {
    cube1 = getRandomSeed();
    cube2 = getRandomSeed();

    cout << "User: " << (curentUser + 1) 
         << " Seeds: " << cube1 << ", " << cube2 << endl << endl;

    if (cube1 != cube2) {
      printPoints();
      switchUser();
      continue;
    }

    if (cube1 == 3) {
      userPoints[curentUser] = 0;
    } else if (cube1 == 6) {
      userPoints[curentUser] += 25;
    } else {
      userPoints[curentUser] += 5;
    }

    printPoints();

    if (userPoints[0] >= 50) {
      cout << "User 1 win" << endl;
      break;
    } else if (userPoints[1] >= 50) {
      cout << "User 2 win" << endl;
      break;
    }

    switchUser();
  }

  return 0;
}
