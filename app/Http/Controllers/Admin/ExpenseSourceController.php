<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ExpenseSource;
use App\Models\User;
use Helper;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class ExpenseSourceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $expenseSource = ExpenseSource::orderByDesc('id')->get();
        return Helper::sendResponse($expenseSource);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return JsonResponse
     * @throws ValidationException
     */
    public function store(Request $request): JsonResponse
    {
        $this->validate($request, [
            'name' => 'required|string|min:3|max:50'
        ]);

        $expenseSource = ExpenseSource::create([
            'name' => $request->name,
            'organization_id' => $request->user()->organization()->first()->id
        ]);

        return Helper::sendResponse($expenseSource, 'Expense source successfully added');
    }


    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param ExpenseSource $expenseSource
     * @return JsonResponse
     * @throws ValidationException
     */
    public function update(Request $request, ExpenseSource $expenseSource): JsonResponse
    {
        $this->validate($request, [
            'name' => 'required|string|min:3|max:50'
        ]);

        $expenseSource->update([
            'name' => $request->name,
        ]);

        return Helper::sendResponse($expenseSource, 'Expense source successfully updated');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param ExpenseSource $expenseSource
     * @return JsonResponse
     */
    public function destroy(ExpenseSource $expenseSource): JsonResponse
    {
        $expenseSource->delete();
        return Helper::sendResponse($expenseSource, 'Expense source successfully Deleted');
    }
}
