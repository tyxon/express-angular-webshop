import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {ItemListComponent} from "@/app/components/item-list/item-list.component";
import {ErrorComponent} from "@/app/components/error/error.component";
import {BasketComponent} from "@/app/components/basket/basket.component";

const routes: Routes = [
  {path: "", redirectTo: "termekek", pathMatch: "full"},
  {path: "termekek", component: ItemListComponent},
  {path: "kosar", component: BasketComponent},
  {path: "**", component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
